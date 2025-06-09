const mongoose = require('mongoose');

const produitLiquideSchema = new mongoose.Schema({
  arome_ml: Number,
  base_l: Number,
  prix_achat_arome: Number,
  prix_achat_base: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProduitLiquide', produitLiquideSchema);
