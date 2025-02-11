import express from 'express';
const router = express.Router();

import { getAllDepartamentos, getDepartamentoById, createDepartamento, updateDepartamento, deleteDepartamento } from '../controllers/DepartamentosController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

// Create
router.post('/', authenticateToken, checkPermission('create_departamentos'), createDepartamento);

// Read
router.get('/', authenticateToken, checkPermission('get_departamentos'), getAllDepartamentos);
router.get('/:id', authenticateToken, checkPermission('get_departamentos'), getDepartamentoById);

// Update
router.put('/:id', authenticateToken, checkPermission('update_departamentos'), updateDepartamento);

// Delete
router.delete('/:id', authenticateToken, checkPermission('delete_departamentos'), deleteDepartamento);

export default router;
