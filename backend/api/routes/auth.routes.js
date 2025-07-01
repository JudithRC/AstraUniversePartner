const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo 10 solicitudes por IP
  message: 'Demasiados intentos, intenta nuevamente más tarde'
});

// Validaciones para el registro de usuario
const registerValidations = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('email').isEmail().withMessage('Debes proporcionar un email válido'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para login
const loginValidations = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('password').notEmpty().withMessage('La contraseña es requerida')
];

// Endpoint para registrar un nuevo usuario
router.post('/register', authLimiter, registerValidations, authController.registerUser);

// Endpoint para iniciar sesión
router.post('/login', authLimiter, loginValidations, authController.loginUser);

module.exports = router;