const mongoose = require('mongoose');

const GalaxySchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagenURL: {
    type: String,
    required: true,
    match: /\.(jpg|jpeg|png)$/i
  }
}, { timestamps: true });

module.exports = mongoose.model('Galaxia', GalaxySchema);
