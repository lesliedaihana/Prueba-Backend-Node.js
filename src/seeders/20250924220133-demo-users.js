'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedOperatorPassword = await bcrypt.hash('operator123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        username: 'admin_user',
        password: hashedAdminPassword,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        username: 'operator_user',
        password: hashedOperatorPassword,
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