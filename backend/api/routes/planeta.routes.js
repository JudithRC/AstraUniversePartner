const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Planeta = require('../models/Planeta');

/**
 * @route GET /planetas
 * @desc Obtener todos los planetas
 * @access Privado
 */
router.get('/', auth, async (req, res) => {
  try {
    const planetas = await Planeta.find({}, '_id nombre descripcion coordenadasMapa imagenURL galaxia');
    res.json(planetas);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener los planetas', error: err.message });
  }
});

/**
 * @route GET /planetas/:id
 * @desc Obtener detalles de un planeta por su ID
 * @access Privado
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const planeta = await Planeta.findById(req.params.id)
    /** Descomentar esta parte cuando exista el modelo Raza
     .populate('galaxia', 'nombre')
     .populate('fundadorUsuarioID', 'nombre')
     .populate('razasAsociadas', 'nombre');
     * 
    */

    if (!planeta) {
      return res.status(404).json({ msg: 'Planeta no encontrado' });
    }

    res.json(planeta);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener el planeta', error: err.message });
  }
});

module.exports = router;
