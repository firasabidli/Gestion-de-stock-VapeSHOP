const Accessoire = require('../../models/AccessoireModel');

exports.createAccessoire = async (req, res) => {
  try {
    const accessoire = await Accessoire.create(req.body);
    res.status(201).json(accessoire);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAccessoires = async (req, res) => {
  try {
    const accessoires = await Accessoire.find();
    res.status(200).json(accessoires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAccessoire = async (req, res) => {
  try {
    const accessoire = await Accessoire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(accessoire);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAccessoire = async (req, res) => {
  try {
    await Accessoire.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Accessoire supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
