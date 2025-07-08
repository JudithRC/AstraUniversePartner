const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Planeta = require('../models/Planeta');
const Galaxia = require('../models/Galaxy');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


let token;
let planetaId;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI);

  await User.deleteMany({ email: 'tester@example.com' });
  const user = await User.create({
    nombre: 'tester',
    email: 'tester@example.com',
    password: 'TestPass123',
    rol: 'usuario'
  });

  const payload = {
    user: {
      id: user._id,
      nombre: user.nombre,
      rol: user.rol
    }
  };
  token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  await Galaxia.deleteMany({});
  const galaxia = await Galaxia.create({
    nombre: 'Andrómeda',
    descripcion: 'Galaxia de prueba',
    imagenURL: 'http://example.com/andromeda.jpg'
  });

  await Planeta.deleteMany({});
  const planeta = await Planeta.create({
    nombre: 'Planeta X',
    descripcion: 'Planeta de prueba',
    coordenadasMapa: { x: 0.5, y: 0.5 },
    imagenURL: 'http://example.com/planeta.jpg',
    galaxia: galaxia._id,
    fundadorUsuarioID: user._id,
    razasAsociadas: [new mongoose.Types.ObjectId()] // simulamos raza existente
  });
  planetaId = planeta._id;
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /planetas', () => {
  it('requiere autenticación', async () => {
    const res = await request(app).get('/planetas');
    expect(res.statusCode).toBe(401);
  });

  it('devuelve todos los planetas si está autenticado', async () => {
    const res = await request(app)
      .get('/planetas')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('nombre');
    expect(res.body[0]).toHaveProperty('descripcion');
    expect(res.body[0]).toHaveProperty('coordenadasMapa');
  });
});

describe('GET /planetas/:id', () => {
  it('devuelve error si el ID no existe', async () => {
    const res = await request(app)
      .get('/planetas/000000000000000000000000')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toMatch(/no encontrado/i);
  });

  it('devuelve detalles del planeta si el ID es válido', async () => {
    const res = await request(app)
      .get(`/planetas/${planetaId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nombre', 'Planeta X');
    expect(res.body).toHaveProperty('galaxia');
    expect(res.body).toHaveProperty('fundadorUsuarioID');
    expect(res.body).toHaveProperty('razasAsociadas');
  });
});
