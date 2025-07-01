const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  // Sanitizar nombre y email antes de validar
  if (req.body.nombre) req.body.nombre = req.body.nombre.trim();
  if (req.body.email) req.body.email = req.body.email.trim().toLowerCase();

  // Validación de datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { nombre, email, password } = req.body;
  try {
    // Verificar unicidad de nombre
    const nameExists = await User.findOne({ nombre });
    if (nameExists) {
      return res.status(400).json({ errores: [{ msg: 'El nombre de usuario ya está registrado' }] });
    }
    // Verificar unicidad de email 
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ errores: [{ msg: 'El email ya está registrado' }] });
    }

    const newUser = new User({
      nombre,
      email,
      password
    });

    await newUser.save();

    const payload = {
      user: {
        id: newUser._id,
        nombre: newUser.nombre,
        rol: newUser.rol
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(201).json({
      msg: 'Usuario registrado correctamente',
      token
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Extrae todos los mensajes de error
     const errores = Object.values(err.errors).map(e => ({ msg: e.message }));
      return res.status(400).json({ errores });
    }
    console.error(err);
    return res.status(500).json({ errores: [{ msg: 'Error del servidor' }] });
  }
};

exports.loginUser = async (req, res) => {
  // Validar campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { nombre, password } = req.body;
  try {
    // Buscar usuario por nombre
    const user = await User.findOne({ nombre });
    if (!user) {
      return res.status(400).json({ errores: [{ msg: 'Credenciales inválidas' }] });
    }

    // Verificar contraseña

    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(400).json({ errores: [{ msg: 'Credenciales inválidas' }] });
    }

    // Generar token JWT

    const payload = {
      user: {
        id: user._id,
        nombre: user.nombre,
        rol: user.rol
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Enviar respuesta con token
    
    return res.status(200).json({
      msg: 'Login exitoso',
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errores: [{ msg: 'Error del servidor' }] });
  }
};