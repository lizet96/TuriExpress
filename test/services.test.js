const request = require('supertest');
const app = require('../src/app');

describe('Services endpoint', () => {
  test('Obtener lista de servicios', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toEqual(200);
    expect(res.body.services.length).toBeGreaterThan(0);
  });
});
