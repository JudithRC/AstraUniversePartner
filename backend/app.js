const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Cambia el puerto si tu frontend usa otro
  credentials: true
}));

const authRoutes = require('./api/routes/auth.routes'); // Ajusta el path si es necesario
const pingRoutes = require('./api/routes/ping'); // Asegúrate de importar el ping

app.use(express.json());
app.use('/auth', authRoutes);
app.use(pingRoutes); // Monta el ping en la raíz

// Imprime las rutas montadas solo si _router existe
if (app._router && app._router.stack) {
  console.log("Rutas montadas:");
  app._router.stack.forEach(r => {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

module.exports = app;