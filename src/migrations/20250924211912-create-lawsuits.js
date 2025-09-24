'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lawsuits', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      case_number: { type: Sequelize.STRING, allowNull: false },
      plaintiff: { type: Sequelize.STRING, allowNull: false },
      defendant: { type: Sequelize.STRING, allowNull: false },
      case_type: { type: Sequelize.ENUM('civil', 'criminal', 'labor', 'commercial'), allowNull: false },
      status: { type: Sequelize.ENUM('pending', 'assigned', 'resolved'), defaultValue: 'pending' },
      lawyer_id: { type: Sequelize.UUID, allowNull: true, references: { model: 'Lawyers', key: 'id' }, onDelete: 'SET NULL' },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lawsuits');
  }
};