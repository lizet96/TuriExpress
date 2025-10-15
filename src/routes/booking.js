const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userId, cabinId, startDate, endDate, guests, paymentMethod } = req.body;

  // Validación básica de ejemplo
  if (!userId || !cabinId || !startDate || !endDate) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  // Si la cabaña ya está reservada (simulación)
  if (cabinId === 'cabin_005' && userId === 'user_456') {
    return res.status(400).json({ error: 'Cabaña no disponible en esas fechas' });
  }

  // Simular total y respuesta exitosa
  const total = 1700;
  const booking = {
    id: 'booking_123',
    userId,
    cabinId,
    startDate,
    endDate,
    guests,
    paymentMethod,
    total,
  };

  res.status(201).json({
    message: 'Reservación confirmada',
    booking,
  });
});

module.exports = router;
