'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lawyers', [
      {
        id: uuidv4(),
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '3001234567',
        specialization: 'Laboral',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'María Gómez',
        email: 'maria.gomez@example.com',
        phone: '3007654321',
        specialization: 'Civil',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lawyers', null, {});
  }
};