const { Lawyer } = require('../models');
const Joi = require('joi'); // Agrega esta línea

const lawyerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': '"name" must be at least 2 characters long',
    'string.max': '"name" must be less than or equal to 100 characters long',
    'any.required': '"name" is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'any.required': '"email" is required'
  }),
  phone: Joi.string().min(7).max(15).required().messages({
    'string.min': '"phone" must be at least 7 characters long',
    'string.max': '"phone" must be less than or equal to 15 characters long',
    'any.required': '"phone" is required'
  }),
  specialization: Joi.string().min(2).max(50).required().messages({
    'string.min': '"specialization" must be at least 2 characters long',
    'string.max': '"specialization" must be less than or equal to 50 characters long',
    'any.required': '"specialization" is required'
  }),
  status: Joi.string().valid('active', 'inactive').required().messages({
    'any.only': '"status" must be one of [active, inactive]',
    'any.required': '"status" is required'
  })
});

exports.getAllLawyers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const lawyers = await Lawyer.findAndCountAll({ limit, offset });
    res.json({
      total: lawyers.count,
      page: parseInt(page),
      limit: parseInt(limit),
      data: lawyers.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLawyerById = async (req, res) => {
  try {
    const { id } = req.params;
    const lawyer = await Lawyer.findByPk(id);
    if (!lawyer) return res.status(404).json({ error: 'Lawyer not found' });
    res.json(lawyer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLawyer = async (req, res) => {
  try {
    const { error } = lawyerSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ error: error.details.map(d => d.message) });

    const { name, email, phone, specialization, status } = req.body;
    const lawyer = await Lawyer.create({ name, email, phone, specialization, status });
    res.status(201).json(lawyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};