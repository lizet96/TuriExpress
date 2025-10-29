import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    stages: [
        { duration: '30s', target: 10 },   // Ramp up
        { duration: '1m', target: 10 },    // Stay at 10 users
        { duration: '30s', target: 0 },    // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.1'],
    },
};

export default function () {
    const BASE_URL = 'http://localhost:3000';
    
    // Test de autenticación
    const authRes = http.get(`${BASE_URL}/api/auth`);
    check(authRes, {
        'auth status is 200': (r) => r.status === 200,
        'auth response time < 500ms': (r) => r.timings.duration < 500,
    });
    
    // Test de servicios
    const servicesRes = http.get(`${BASE_URL}/api/services`);
    check(servicesRes, {
        'services status is 200': (r) => r.status === 200,
    });
    
    // Test de bookings
    const bookingRes = http.get(`${BASE_URL}/api/booking`);
    check(bookingRes, {
        'booking status is 200': (r) => r.status === 200,
    });
    
    sleep(1);
}

export function handleSummary(data) {
    return {
        'summary.json': JSON.stringify(data, null, 2),
        'summary.html': htmlReport(data),
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    };
}