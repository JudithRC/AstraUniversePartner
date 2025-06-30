const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Validaciones para el registro de usuario
const registerValidations = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('email')
    .isEmail().withMessage('Debes proporcionar un email válido'),
  check('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Endpoint para registrar un nuevo usuario
router.post('/register', registerValidations, authController.registerUser);

module.exports = router;