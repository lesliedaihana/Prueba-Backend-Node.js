 
const { Lawyer } = require('../models');

exports.getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.findAll();
    res.json(lawyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLawyer = async (req, res) => {
  try {
    const { name, email, phone, specialization, status } = req.body;
    const lawyer = await Lawyer.create({ name, email, phone, specialization, status });
    res.status(201).json(lawyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};