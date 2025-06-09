const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nom: String,
  prix: Number,
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
