import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // subir a 10 usuarios concurrentes en 30s
    { duration: '1m', target: 10 },  // mantener 10 usuarios durante 1 minuto
    { duration: '30s', target: 0 },  // bajar a 0 usuarios
  ],
};

const BASE_URL = 'http://localhost:3000/api'; // o tu URL del backend desplegado

export default function () {
  // 1️⃣ Prueba del endpoint de autenticación (login simulado)
  const authRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: 'test@example.com',
    password: '123456'
  }), { headers: { 'Content-Type': 'application/json' } });

  check(authRes, {
    'login exitoso o manejado correctamente': (r) => r.status === 200 || r.status === 401,
  });

  // 2️⃣ Prueba del endpoint de servicios
  const servicesRes = http.get(`${BASE_URL}/services`);
  check(servicesRes, {
    'carga de servicios exitosa': (r) => r.status === 200,
  });

  // 3️⃣ Prueba de creación de booking
  const bookingRes = http.post(`${BASE_URL}/bookings`, JSON.stringify({
    serviceId: '123',
    date: '2025-10-30',
    time: '10:00',
  }), { headers: { 'Content-Type': 'application/json' } });

  check(bookingRes, {
    'creación de booking manejada correctamente': (r) => r.status === 200 || r.status === 400,
  });

  sleep(1); // pequeña pausa entre peticiones
}
