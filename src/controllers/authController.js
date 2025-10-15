const { users } = require('../utils/db');

exports.register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y password son requeridos' });

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ error: 'Usuario ya registrado' });

  users.push({ email, password });
  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  res.json({ message: 'Login exitoso' });
};
