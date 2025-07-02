/**
 * Rutas de autenticación para registro y login de usuarios.
 * @module routes/auth
 */

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

/**
 * Validaciones para el registro de usuario.
 * - nombre: requerido
 * - email: debe ser válido
 * - password: mínimo 6 caracteres
 */
const registerValidations = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('email').isEmail().withMessage('Debes proporcionar un email válido'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

/**
 * Validaciones para login de usuario.
 * - nombre: requerido
 * - password: requerido
 */
const loginValidations = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('password').notEmpty().withMessage('La contraseña es requerida')
];

/**
 * @route POST /register
 * @desc Registrar un nuevo usuario
 * @access Público (limitado por rate limiter)
 */
router.post('/register', authLimiter, registerValidations, authController.registerUser);

/**
 * @route POST /login
 * @desc Iniciar sesión de usuario
 * @access Público (limitado por rate limiter)
 */
router.post('/login', authLimiter, loginValidations, authController.loginUser);

module.exports = router;