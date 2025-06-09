const mongoose = require('mongoose');

const liquideSchema = new mongoose.Schema({
  nom: String,
  categorie: { type: String, enum: ['gourmand', 'fruité'] },
  quantite: Number,
  prix_vente: Number,
  type: { type: String, enum: ['bouteille', 'dose'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('liquides', liquideSchema);
