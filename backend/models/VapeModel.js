const mongoose = require('mongoose');

const vapeSchema = new mongoose.Schema({
  nom: String,
  categorie: String,
  quantite: Number,
  prix_achat: Number,
  prix_vente: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('vapes', vapeSchema);
