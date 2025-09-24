 
const { Lawsuit } = require('../models');

exports.getAllLawsuits = async (req, res) => {
  try {
    const lawsuits = await Lawsuit.findAll({ include: ['lawyer'] });
    res.json(lawsuits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLawsuit = async (req, res) => {
  try {
    const { case_number, plaintiff, defendant, case_type, status, lawyer_id } = req.body;
    const lawsuit = await Lawsuit.create({ case_number, plaintiff, defendant, case_type, status, lawyer_id });
    res.status(201).json(lawsuit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};