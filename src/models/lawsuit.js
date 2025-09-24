'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lawsuit extends Model {
    static associate(models) {
      Lawsuit.belongsTo(models.Lawyer, { foreignKey: 'lawyer_id', as: 'lawyer' });
    }
  }
  Lawsuit.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    case_number: DataTypes.STRING,
    plaintiff: DataTypes.STRING,
    defendant: DataTypes.STRING,
    case_type: DataTypes.ENUM('civil', 'criminal', 'labor', 'commercial'),
    status: DataTypes.ENUM('pending', 'assigned', 'resolved'),
    lawyer_id: { type: DataTypes.UUID, allowNull: true, references: { model: 'Lawyers', key: 'id' } },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Lawsuit',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Lawsuit;
};