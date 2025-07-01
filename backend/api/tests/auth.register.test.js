const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require('../models/User');

describe('POST /auth/register', () => {
  beforeAll(async () => {
    const url = process.env.TEST_MONGO_URI || 'mongodb://127.0.0.1/aupdb_test';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Registra usuario válido, responde con 201 y retorna un token', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'TestUser',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.msg).toMatch(/Usuario registrado/i);
  });

  it('No permite duplicar nombre', async () => {
    await User.create({
      nombre: 'Duplicado',
      email: 'duplicado@example.com',
      password: 'password123'
    });

    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Duplicado',
        email: 'otroemail@example.com',
        password: 'password456'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/nombre de usuario ya está registrado/i);

    // Debe seguir habiendo solo un usuario con ese nombre
    const users = await User.find({ nombre: 'Duplicado' });
    expect(users.length).toBe(1);
  });

  it('No permite duplicar email', async () => {
    await User.create({
      nombre: 'User1',
      email: 'correo@existe.com',
      password: 'password123'
    });

    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'User2',
        email: 'correo@existe.com',
        password: 'password456'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/email ya está registrado/i);
  });

  it('Valida campos obligatorios', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({}); // vacío

    expect(res.statusCode).toBe(400);
    const mensajes = res.body.errores.map(e => e.msg).join(' ');
    expect(mensajes).toMatch(/nombre/i);
    expect(mensajes).toMatch(/email/i);
    expect(mensajes).toMatch(/contraseña|password/i);
  });

  it('Valida nombre demasiado corto', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'AB',
        email: 'shortname@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/nombre.*3.*15/i);
  });

  it('Valida nombre demasiado largo', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'EsteNombreEsDemasiadoLargo',
        email: 'longname@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/nombre.*3.*15/i);
  });

  it('Valida email con formato incorrecto', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'NombreValido',
        email: 'no-valido',
        password: 'password123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/email válido/i);
  });

  it('Valida contraseña muy corta', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'NombreValido2',
        email: 'test2@example.com',
        password: '123'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores[0].msg).toMatch(/al menos 6 caracteres/i);
    // Que no se creó el usuario
    const user = await User.findOne({ email: 'test2@example.com' });
    expect(user).toBeNull();
  });

  it('Ignora o rechaza campos no permitidos (rol, estado, etc.)', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'ExtraFields',
        email: 'extrafields@example.com',
        password: 'password123',
        rol: 'admin',
        estado: 'inactivo',
        otroCampo: 'no permitido'
      });
    expect(res.statusCode).toBe(201);
    const user = await User.findOne({ nombre: 'ExtraFields' });
    expect(user.rol).toBe('usuario'); // No debe ser admin
    expect(user.estado).toBe('activo'); // No debe ser inactivo
    expect(user.otroCampo).toBeUndefined();
  });

  it('No filtra datos sensibles en la respuesta', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'SecUser',
        email: 'security@example.com',
        password: 'password123'
      });
    expect(res.body.password).toBeUndefined();
    expect(res.body.email).toBeUndefined();
    expect(res.body.nombre).toBeUndefined();
    expect(res.body.token).toBeDefined();
  });

  it('No crea usuario si falla la validación', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        nombre: '',
        email: 'mal',
        password: '1'
      });
    const user = await User.findOne({ email: 'mal' });
    expect(user).toBeNull();
  });
});