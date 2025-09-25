const express = require('express');
const { sequelize } = require('./src/models');
const routes = require('./src/routes');
const app = express();
app.use(express.json());
app.use('/api', routes);

// Ruta básica para probar el servidor
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LegalSuite Backend!' });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Middleware de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;