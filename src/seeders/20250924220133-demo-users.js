'use strict';
const { v4: uuidv4 } = require('uuid'); // Asegúrate de instalar uuid con `npm install uuid`
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        username: 'admin_user',
        password: 'admin123', // Hashearás esto más adelante con bcrypt
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        username: 'operator_user',
        password: 'operator123',
        role: 'operator',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};