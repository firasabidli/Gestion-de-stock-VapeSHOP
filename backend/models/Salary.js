const mongoose = require('mongoose');

const avanceSchema = new mongoose.Schema({
  montant: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const salarySchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  mois: { 
    type: String, 
    required: true 
  }, // Format recommandé : "2025-05"
  montant: { 
    type: Number, 
    required: true 
  }, // Montant total du salaire (par ex : 1000 TND)
  avances: [avanceSchema] ,
  isPaid: { 
    type: Boolean, 
    default: false 
  },
  datePaiement: { 
    type: Date, 
    default: null 
  }
}, {
  timestamps: true // createdAt et updatedAt
});


salarySchema.index({ user: 1, mois: 1 }, { unique: true });

module.exports = mongoose.model('Salary', salarySchema);
