import express from 'express';
const router = express.Router();

import { getAllCargos, getCargoById, createCargo, updateCargo, deleteCargo } from '../controllers/CargosController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

// Create
router.post('/', authenticateToken, checkPermission('create_cargos'), createCargo);

// Read
router.get('/', authenticateToken, checkPermission('get_cargos'), getAllCargos);
router.get('/:id', authenticateToken, checkPermission('get_cargos'), getCargoById);

// Update
router.put('/:id', authenticateToken, checkPermission('update_cargos'), updateCargo);

// Delete
router.delete('/:id', authenticateToken, checkPermission('delete_cargos'), deleteCargo);

export default router;
