const jwt = require('jsonwebtoken');

/**
 * Middleware para proteger rutas mediante JWT.
 * Espera el token en el header Authorization: Bearer <token>
 */
module.exports = (req, res, next) => {
  // 1. Obtener el header Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No autorizado: token faltante o mal formado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Adjuntar la info del usuario al req para usarlo en controladores
    req.user = decoded.user; // { id, nombre, rol, ... }
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

/**
 * ¿Cómo usar este middleware?
 * 
 * const express = require('express');
 * const router = express.Router();
 * const auth = require('../middleware/auth');
 * const userController = require('../controllers/userController');
 * 
 * router.get('/perfil', auth, userController.getProfile);
 * 
 * Ahora solo los usuarios autenticados pueden acceder a /perfil
 */