const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  if (req.body.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }

  // Manejar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { nombre, email, password } = req.body;
  try {
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
        email: newUser.email,
        rol: newUser.rol
      }
    };

    console.log("JWT_SECRET:", process.env.JWT_SECRET); // debugging line

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
    console.error(err);
    return res.status(500).json({ errores: [{ msg: 'Error del servidor' }] });
  }
};