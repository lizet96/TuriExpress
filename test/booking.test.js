const request = require('supertest');
const app = require('../src/app');

describe('Booking endpoint', () => {
  test('Reservar cabaña correctamente', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        userId: 'user_123',
        cabinId: 'cabin_005',
        startDate: '2025-11-15',
        endDate: '2025-11-17',
        guests: 4,
        paymentMethod: 'card',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('Reservación confirmada');
    expect(res.body.booking).toHaveProperty('id');
    expect(res.body.booking.total).toEqual(1700);
  });

  test('No permitir doble reservación en mismas fechas', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        userId: 'user_456',
        cabinId: 'cabin_005',
        startDate: '2025-11-15',
        endDate: '2025-11-17',
        guests: 2,
        paymentMethod: 'card',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Cabaña no disponible en esas fechas');
  });
});
