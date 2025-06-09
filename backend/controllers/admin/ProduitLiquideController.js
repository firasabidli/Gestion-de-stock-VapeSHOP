const ProduitLiquide = require('../../models/ProduitLiquideModel');

exports.createProduit = async (req, res) => {
  try {
    const produit = await ProduitLiquide.create(req.body);
    res.status(201).json(produit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProduits = async (req, res) => {
  try {
    const produits = await ProduitLiquide.find();
    res.status(200).json(produits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    const produit = await ProduitLiquide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(produit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduit = async (req, res) => {
  try {
    await ProduitLiquide.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
