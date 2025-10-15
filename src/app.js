const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

module.exports = app;

// Solo si se ejecuta directamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}
