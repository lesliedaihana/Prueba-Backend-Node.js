const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const secret = 'daihana'; 

// Esquema de validación para crear usuario
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.min': '"username" must be at least 3 characters long',
    'string.max': '"username" must be less than or equal to 30 characters long',
    'any.required': '"username" is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" must be at least 6 characters long',
    'any.required': '"password" is required'
  }),
  role: Joi.string().valid('admin', 'operator').required().messages({
    'any.only': '"role" must be one of [admin, operator]',
    'any.required': '"role" is required'
  })
});

// Esquema de validación para login
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.min': '"username" must be at least 3 characters long',
    'string.max': '"username" must be less than or equal to 30 characters long',
    'any.required': '"username" is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" must be at least 6 characters long',
    'any.required': '"password" is required'
  })
});

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ error: error.details.map(d => d.message) });

    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ error: error.details.map(d => d.message) });

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};