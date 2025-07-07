// models/Planeta.js
const mongoose = require('mongoose');

const CoordenadasRelativasSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  y: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  }
}, { _id: false });

const PlanetaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true
  },
  coordenadasMapa: {
    type: CoordenadasRelativasSchema,
    required: true
  },
  imagenURL: {
    type: String,
    required: true,
    match: /\.(jpg|jpeg|png)$/i
  },
  galaxia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Galaxia',
    required: true
  },
  fundadorUsuarioID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  razasAsociadas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Raza'
  }],
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Planeta', PlanetaSchema);
