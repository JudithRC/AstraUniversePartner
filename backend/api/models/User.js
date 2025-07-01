const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: true,
    minlength: [3, 'El nombre debe tener entre 3 y 15 caracteres'],
    maxlength: [15, 'El nombre debe tener entre 3 y 15 caracteres'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Email inválido'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario',
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo',
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  }
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);