const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const lawyerController = require('../controllers/lawyerController');
const lawsuitController = require('../controllers/lawsuitController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión y devuelve un JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin_user
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Token JWT generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación
 */
router.get('/users', authMiddleware, userController.getAllUsers);
router.post('/users', authMiddleware, userController.createUser);

/**
 * @swagger
 * /lawyers:
 *   get:
 *     summary: Lista todos los abogados con paginación
 *     tags: [Lawyers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista paginada de abogados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lawyer'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crea un nuevo abogado
 *     tags: [Lawyers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lawyer'
 *     responses:
 *       201:
 *         description: Abogado creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lawyer'
 *       400:
 *         description: Error de validación
 */
router.get('/lawyers', authMiddleware, lawyerController.getAllLawyers);
router.post('/lawyers', authMiddleware, lawyerController.createLawyer);

/**
 * @swagger
 * /lawyers/{id}:
 *   get:
 *     summary: Obtiene un abogado por ID
 *     tags: [Lawyers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detalles del abogado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lawyer'
 *       404:
 *         description: Abogado no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/lawyers/:id', authMiddleware, lawyerController.getLawyerById);

/**
 * @swagger
 * /lawsuits:
 *   get:
 *     summary: Lista todas las demandas con filtros
 *     tags: [Lawsuits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, assigned, resolved]
 *       - in: query
 *         name: lawyer_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de demandas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lawsuit'
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crea una nueva demanda
 *     tags: [Lawsuits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lawsuit'
 *     responses:
 *       201:
 *         description: Demanda creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lawsuit'
 *       400:
 *         description: Error de validación
 */
router.get('/lawsuits', authMiddleware, lawsuitController.getAllLawsuits);
router.post('/lawsuits', authMiddleware, lawsuitController.createLawsuit);

/**
 * @swagger
 * /lawsuits/{id}/assign:
 *   put:
 *     summary: Asigna un abogado a una demanda
 *     tags: [Lawsuits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lawyer_id:
 *                 type: string
 *                 format: uuid
 *                 example: 2419e0f8-080c-4206-be8b-12c52c198929
 *     responses:
 *       200:
 *         description: Demanda actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lawsuit'
 *       404:
 *         description: Demanda no encontrada
 *       401:
 *         description: No autorizado
 */
router.put('/lawsuits/:id/assign', authMiddleware, lawsuitController.assignLawyer);

/**
 * @swagger
 * /reports/lawyers/{id}/lawsuits:
 *   get:
 *     summary: Lista de demandas por abogado
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reporte de demandas por abogado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lawyer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                 lawsuits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       case_number:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [pending, assigned, resolved]
 *       404:
 *         description: Abogado no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/reports/lawyers/:id/lawsuits', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const lawyer = await Lawyer.findByPk(id, { include: [{ model: Lawsuit, as: 'lawsuits' }] });
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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, operator]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Lawyer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         specialization:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Lawsuit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         case_number:
 *           type: string
 *         plaintiff:
 *           type: string
 *         defendant:
 *           type: string
 *         case_type:
 *           type: string
 *           enum: [civil, criminal, labor, commercial]
 *         status:
 *           type: string
 *           enum: [pending, assigned, resolved]
 *         lawyer_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */