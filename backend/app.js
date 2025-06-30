const express = require('express');
const app = express();
const cors = require('cors');

// ...toda tu configuración de middlewares, rutas, etc...
// Ejemplo: app.use('/auth', require('./routes/auth'));

// Middlewares generales
app.use(express.json());
app.use(cors());

// Aquí puedes importar rutas y middlewares según crezca el proyecto

const pingRoute = require('./routes/ping'); // Ruta de ejemplo para verificar el servidor
app.use(pingRoute);

const authRoutes = require('./routes/auth'); // Rutas de autenticación para el registro de un usuario
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});

module.exports = app;