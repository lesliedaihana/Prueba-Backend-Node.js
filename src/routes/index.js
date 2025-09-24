 
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const lawyerController = require('../controllers/lawyerController');
const lawsuitController = require('../controllers/lawsuitController');

// Rutas para Users
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

// Rutas para Lawyers
router.get('/lawyers', lawyerController.getAllLawyers);
router.post('/lawyers', lawyerController.createLawyer);

// Rutas para Lawsuits
router.get('/lawsuits', lawsuitController.getAllLawsuits);
router.post('/lawsuits', lawsuitController.createLawsuit);

module.exports = router;