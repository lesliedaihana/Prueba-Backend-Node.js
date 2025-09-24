'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lawsuits', [
      {
        id: uuidv4(),
        case_number: 'DEM-2025-001',
        plaintiff: 'Empresa XYZ',
        defendant: 'Juan Rodríguez',
        case_type: 'labor',
        status: 'pending',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        case_number: 'DEM-2025-002',
        plaintiff: 'Ana López',
        defendant: 'Comercial SA',
        case_type: 'commercial',
        status: 'pending',
        lawyer_id: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lawsuits', null, {});
  }
};