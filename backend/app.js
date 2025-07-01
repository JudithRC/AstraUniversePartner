const express = require('express');
const app = express();

const authRoutes = require('./api/routes/auth.routes'); // Ajusta el path si es necesario

app.use(express.json());
app.use('/auth', authRoutes);

module.exports = app;