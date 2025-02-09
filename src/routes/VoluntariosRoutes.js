import express from 'express';
const router = express.Router();

import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';
import {
    createVoluntario,
    getVoluntarioById,
    updateVoluntario,
    deleteVoluntario,
    getAllVoluntarios
} from '../controllers/VoluntariosController.js';

// Create
router.post('/', authenticateToken, checkPermission("create_voluntarios"), createVoluntario);

// Read
router.get('/', authenticateToken, checkPermission("get_voluntarios"), getAllVoluntarios);
router.get('/:id', authenticateToken, checkPermission("get_voluntarios"), getVoluntarioById);

// Update
router.put('/:id', authenticateToken, checkPermission("update_voluntarios"), updateVoluntario);

// Delete
router.delete('/:id', authenticateToken, checkPermission("delete_voluntarios"), deleteVoluntario);

export default router;
