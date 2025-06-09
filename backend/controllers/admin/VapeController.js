const Vape = require('../../models/VapeModel');

exports.createVape = async (req, res) => {
  try {
    const vape = await Vape.create(req.body);
    res.status(201).json(vape);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllVapes = async (req, res) => {
  try {
    const vapes = await Vape.find();
    res.status(200).json(vapes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVape = async (req, res) => {
  try {
    const vape = await Vape.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(vape);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteVape = async (req, res) => {
  try {
    await Vape.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Vape supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
