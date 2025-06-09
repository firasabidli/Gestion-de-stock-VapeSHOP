const Liquide = require('../../models/LiquideModel');

exports.createLiquide = async (req, res) => {
  try {
    const liquide = await Liquide.create(req.body);
    res.status(201).json(liquide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllLiquides = async (req, res) => {
  try {
    const liquides = await Liquide.find();
    res.status(200).json(liquides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLiquidesgrouped = async (req, res) => {
  try {
    const liquides = await Liquide.find();

    const fruiteDose = liquides.filter(l => l.categorie === 'fruité' && l.type === 'dose');
    const fruiteBouteille = liquides.filter(l => l.categorie === 'fruité' && l.type === 'bouteille');
    const gourmandDose = liquides.filter(l => l.categorie === 'gourmand' && l.type === 'dose');
    const gourmandBouteille = liquides.filter(l => l.categorie === 'gourmand' && l.type === 'bouteille');

    res.status(200).json({
      liquides,             
      fruiteDose,        
      fruiteBouteille,    
      gourmandDose,         
      gourmandBouteille     
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateLiquide = async (req, res) => {
  try {
    const liquide = await Liquide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(liquide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteLiquide = async (req, res) => {
  try {
    await Liquide.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Liquide supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
