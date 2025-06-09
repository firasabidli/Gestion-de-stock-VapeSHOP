const Service = require('../../models/ServiceModel');

exports.createService = async (req, res) => {
  try {
    const createdBy = req.user.id; 
    const { nom, prix} = req.body;
    const service = await Service.create({
      nom,
      prix,
      createdBy,
      
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
