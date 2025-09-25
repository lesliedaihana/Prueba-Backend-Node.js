const { Lawsuit } = require('../models');
const Joi = require('joi');

const lawsuitSchema = Joi.object({
  case_number: Joi.string().min(3).max(50).required().messages({
    'string.min': '"case_number" must be at least 3 characters long',
    'string.max': '"case_number" must be less than or equal to 50 characters long',
    'any.required': '"case_number" is required'
  }),
  plaintiff: Joi.string().min(2).max(100).required().messages({
    'string.min': '"plaintiff" must be at least 2 characters long',
    'string.max': '"plaintiff" must be less than or equal to 100 characters long',
    'any.required': '"plaintiff" is required'
  }),
  defendant: Joi.string().min(2).max(100).required().messages({
    'string.min': '"defendant" must be at least 2 characters long',
    'string.max': '"defendant" must be less than or equal to 100 characters long',
    'any.required': '"defendant" is required'
  }),
  case_type: Joi.string().valid('civil', 'criminal', 'labor', 'commercial').required().messages({
    'any.only': '"case_type" must be one of [civil, criminal, labor, commercial]',
    'any.required': '"case_type" is required'
  }),
  status: Joi.string().valid('pending', 'assigned', 'resolved').required().messages({
    'any.only': '"status" must be one of [pending, assigned, resolved]',
    'any.required': '"status" is required'
  }),
  lawyer_id: Joi.string().uuid().allow(null).messages({
    'string.uuid': '"lawyer_id" must be a valid UUID'
  })
});

exports.getAllLawsuits = async (req, res) => {
  try {
    const { status, lawyer_id } = req.query;
    const where = {};
    if (status) where.status = status;
    if (lawyer_id) where.lawyer_id = lawyer_id;

    const lawsuits = await Lawsuit.findAll({ where });
    res.json(lawsuits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLawsuit = async (req, res) => {
  try {
    const { error } = lawsuitSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ error: error.details.map(d => d.message) });

    const { case_number, plaintiff, defendant, case_type, status, lawyer_id } = req.body;
    const lawsuit = await Lawsuit.create({ case_number, plaintiff, defendant, case_type, status, lawyer_id });
    res.status(201).json(lawsuit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.assignLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    const { lawyer_id } = req.body;
    const lawsuit = await Lawsuit.findByPk(id);
    if (!lawsuit) return res.status(404).json({ error: 'Lawsuit not found' });
    await lawsuit.update({ lawyer_id, status: 'assigned' });
    res.json(lawsuit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};