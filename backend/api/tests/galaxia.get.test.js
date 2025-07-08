const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Galaxia = require('../models/Galaxy');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI);

  // 💥 Limpia usuarios ANTES de crearlo
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
  await Galaxia.create([
    {
      nombre: 'Andrómeda',
      descripcion: 'Una galaxia cercana',
      imagenURL: 'http://example.com/andromeda.jpg'
    },
    {
      nombre: 'Vía Láctea',
      descripcion: 'Nuestra galaxia',
      imagenURL: 'http://example.com/vialactea.png'
    }
  ]);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /galaxias', () => {
  it('requiere autenticación', async () => {
    const res = await request(app).get('/galaxias');
    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toMatch(/no autorizado/i);
  });

  it('devuelve galaxias correctamente si está autenticado', async () => {
    const res = await request(app)
      .get('/galaxias')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);

    res.body.forEach(g => {
      expect(g).toHaveProperty('_id');
      expect(g).toHaveProperty('nombre');
      expect(g).toHaveProperty('descripcion');
      expect(g).toHaveProperty('imagenURL');
    });
  });
});
