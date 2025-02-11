import express from 'express';
const router = express.Router();

import { getAllCargos, getCargoById, createCargo, updateCargo, deleteCargo } from '../controllers/CargosController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

import {IdValidator} from '../validators/GenericValidator.js';
// Create
router.post('/', authenticateToken, checkPermission('create_cargos'), createCargo);

// Read
router.get('/', authenticateToken, checkPermission('get_cargos'), getAllCargos);
router.get('/:id', authenticateToken, checkPermission('get_cargos'), IdValidator, getCargoById);

// Update
router.put('/:id', authenticateToken, checkPermission('update_cargos'), IdValidator, updateCargo);

// Delete
router.delete('/:id', authenticateToken, checkPermission('delete_cargos'), IdValidator, deleteCargo);

export default router;
