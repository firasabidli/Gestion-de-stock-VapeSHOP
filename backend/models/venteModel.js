const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({
  produit_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'type'
  },
  type: {
    type: String,
    required: true,
    enum: ['vapes', 'liquides', 'accessoires']
  },
  quantite: { type: Number, required: true },
  prix_unitaire: { type: Number, required: true },
  total: { type: Number, required: true },
  date_vente: { type: Date, default: Date.now },
  vente_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
});

module.exports = mongoose.model('Vente', venteSchema);
