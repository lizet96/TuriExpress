

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 10 },   // Ramp up a 10 usuarios
        { duration: '1m', target: 10 },    // Mantener 10 usuarios
        { duration: '30s', target: 0 },    // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],  // 95% de requests < 500ms
        http_req_failed: ['rate<0.1'],     // < 10% de errores
    },
};

export default function () {
    const BASE_URL = 'http://localhost:3000';
    
    // Test endpoint de autenticación
    const authRes = http.get(`${BASE_URL}/api/auth`);
    check(authRes, {
        'auth status is 200': (r) => r.status === 200,
        'auth response time < 500ms': (r) => r.timings.duration < 500,
    });
    
    sleep(1);
}

// Genera un resumen en JSON
export function handleSummary(data) {
    return {
        'summary.json': JSON.stringify(data, null, 2),
    };
}