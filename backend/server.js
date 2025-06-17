require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const firebaseAdmin = require('./config/firebase');
const connectDB = require('./config/db');
connectDB();

// Middlewares generales
app.use(express.json());
app.use(cors());

// Aquí puedes importar rutas y middlewares según crezca el proyecto

const pingRoute = require('./routes/ping');
app.use(pingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});