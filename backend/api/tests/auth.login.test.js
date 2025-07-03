const request = require('supertest');
const app = require('../../app'); // Ajusta el path si es necesario
const User = require('../models/User');
const mongoose = require('mongoose');

describe('POST /auth/login', () => {
  beforeAll(async () => {
    // Conecta a la base de datos de test, limpia usuarios y crea uno de prueba
    await mongoose.connect(process.env.TEST_MONGO_URI);
    await User.deleteMany({});
    await User.create({
      nombre: 'usuarioTest',
      email: 'usuariotest@example.com',
      password: 'claveSegura123', // Se hasheará automáticamente por el pre('save')
      rol: 'usuario'
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Permite login correcto y retorna un token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        nombre: 'usuarioTest',
        password: 'claveSegura123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.msg).toMatch(/login exitoso/i);
    // Nunca debe venir el password en la respuesta
    expect(res.body.password).toBeUndefined();
  });

  it('Falla con usuario inexistente', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        nombre: 'noExiste',
        password: 'claveSegura123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/credenciales inválidas/i);
  });

  it('Falla con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        nombre: 'usuarioTest',
        password: 'contraseñaMala'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/credenciales inválidas/i);
  });

  it('Falla si falta el nombre', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        password: 'claveSegura123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/nombre es requerido/i);
  });

  it('Falla si falta la contraseña', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        nombre: 'usuarioTest'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/contraseña es requerida/i);
  });

  it('No filtra datos sensibles en la respuesta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        nombre: 'usuarioTest',
        password: 'claveSegura123'
      });
    expect(res.body.email).toBeUndefined();
    expect(res.body.password).toBeUndefined();
    expect(res.body.rol).toBeUndefined();
  });

  it('No permite campos adicionales no esperados', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        nombre: 'usuarioTest',
        password: 'claveSegura123',
        rol: 'admin',
        estado: 'inactivo'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    // El usuario sigue siendo 'usuario', 'activo'
    const user = await User.findOne({ nombre: 'usuarioTest' });
    expect(user.rol).toBe('usuario');
    expect(user.estado).toBe('activo');
  });
});