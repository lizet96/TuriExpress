const request = require('supertest');
const app = require('../src/app');

describe('Auth endpoints', () => {
  test('Registrar usuario correctamente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('Usuario registrado correctamente');
  });

  test('Login exitoso', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Login exitoso');
  });

  test('Login falla con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrong' });
    expect(res.statusCode).toEqual(401);
  });
});
