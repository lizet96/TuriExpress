const { services } = require('../utils/db');

exports.getServices = (req, res) => {
  res.json({ services });
};
