const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.token; // <-- Récupéré depuis le cookie

  if (!token) return res.status(401).json({ message: 'Non authentifié' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}


function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réservé aux admins' });
  }
  next();
}

function isAdminOrVendeur(req, res, next) {
  if (['admin', 'vendeur'].includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ message: 'Accès refusé' });
  }
}

module.exports = { verifyToken, isAdmin, isAdminOrVendeur };
