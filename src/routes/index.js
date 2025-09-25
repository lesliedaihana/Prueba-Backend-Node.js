const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const lawyerController = require('../controllers/lawyerController');
const lawsuitController = require('../controllers/lawsuitController');
const authMiddleware = require('../middleware/auth'); // Esta línea es correcta

// Rutas para autenticación
router.post('/login', userController.login);

// Rutas para Users (protegidas)
router.get('/users', authMiddleware, userController.getAllUsers);
router.post('/users', authMiddleware, userController.createUser);

// Rutas para Lawyers (protegidas)
router.get('/lawyers', authMiddleware, lawyerController.getAllLawyers);
router.get('/lawyers/:id', authMiddleware, lawyerController.getLawyerById);
router.post('/lawyers', authMiddleware, lawyerController.createLawyer);

// Rutas para Lawsuits (protegidas)
router.get('/lawsuits', authMiddleware, lawsuitController.getAllLawsuits);
router.post('/lawsuits', authMiddleware, lawsuitController.createLawsuit);
router.put('/lawsuits/:id/assign', authMiddleware, lawsuitController.assignLawyer);

// Rutas para Reportes (protegidas)
router.get('/reports/lawyers/:id/lawsuits', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const lawyer = await Lawyer.findByPk(id, { include: ['lawsuits'] });
    if (!lawyer) return res.status(404).json({ error: 'Lawyer not found' });
    res.json({
      lawyer: { id: lawyer.id, name: lawyer.name },
      lawsuits: lawyer.lawsuits.map(l => ({ id: l.id, case_number: l.case_number, status: l.status }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;