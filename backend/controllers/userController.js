const User = require('../models/user');
const Salary = require('../models/Salary');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Identifiants invalides' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: true, // 
    sameSite: 'None',
    maxAge: 3600000, // 1 heure
  });

  res.json({ message: 'Connexion réussie', user: {
    id: user._id, name: user.name, email: user.email, role: user.role
  }});
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.json({ message: 'Déconnexion réussie' });
};


exports.createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, salaire } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      salaire
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role: 'vendeur'});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.params.id;

    // Vérifier si l'email est modifié et déjà utilisé par un autre utilisateur
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Cet email est déjà pris' });
      }
    }

    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET profil
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// PUT modifier les infos (nom, email)
exports.updateUserInfo = async (req, res) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

// PUT modifier le mot de passe
exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Ancien mot de passe incorrect' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Mot de passe mis à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.donnerAvanceOuPayer = async (req, res) => {
 try {
    const { userId, mois, montantAvance } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    let salaire = await Salary.findOne({ user: userId, mois });

    if (!salaire) {
      salaire = new Salary({
        user: userId,
        mois,
        montant: user.salaire,
        avances: [],
        isPaid: false
      });
    }

    // Ajouter une nouvelle avance dans la liste
    salaire.avances.push({ montant: montantAvance, date: new Date() });

    // Calculer le total avancé
    const totalAvance = salaire.avances.reduce((acc, a) => acc + a.montant, 0);

    const montantRestant = salaire.montant - totalAvance;

    if (montantRestant <= 0) {
      salaire.isPaid = true;
      salaire.datePaiement = new Date();
    } else {
      salaire.isPaid = false;
      salaire.datePaiement = null;
    }

    await salaire.save();

    return res.status(200).json({
      message: salaire.isPaid ? "Salaire entièrement payé." : "Avance enregistrée.",
      salaire,
      montantRestant: Math.max(0, montantRestant),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};


exports.historiqueSalaireAllEmploye = async (req, res) => {
 try {
    const salaires = await Salary.find()
      .populate('user') // afficher info utilisateur
      .sort({ mois: -1 }); 
    return res.status(200).json(salaires);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.historiqueSalaireOneEmploye = async (req, res) => {
 try {
  const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    const salaires = await Salary.find({ user: req.params.id})
      .populate('user') // afficher info utilisateur
      .sort({ mois: -1 }); 
    return res.status(200).json(salaires);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

