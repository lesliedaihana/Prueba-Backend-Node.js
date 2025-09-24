'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lawyer extends Model {
    static associate(models) {
      Lawyer.hasMany(models.Lawsuit, { foreignKey: 'lawyer_id', as: 'lawsuits' });
    }
  }
  Lawyer.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    specialization: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'inactive'),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Lawyer',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Lawyer;
};