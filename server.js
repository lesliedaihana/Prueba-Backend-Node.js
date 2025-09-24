const express = require('express');
const { sequelize } = require('./src/models');
const routes = require('./src/routes');
const app = express();
app.use(express.json());
app.use('/api', routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;