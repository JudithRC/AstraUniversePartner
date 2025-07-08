const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Galaxia = require('../models/Galaxy');

/**
 * @route GET /galaxias
 * @desc Obtener todas las galaxias
 * @access Privado (requiere token JWT válido)
 */
router.get('/', auth, async (req, res) => {
  try {
    const galaxias = await Galaxia.find({}, '_id nombre descripcion imagenURL');
    res.json(galaxias);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener galaxias', error: err.message });
  }
});

module.exports = router;
