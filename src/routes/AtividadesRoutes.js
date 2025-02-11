import express from 'express';
const router = express.Router();

import { getAllAtividades, getAtividadeById, createAtividade, updateAtividade, deleteAtividade, updateFrequenciasAtividade } from '../controllers/AtividadesController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

import {atividadesValidator, voluntariosIdValidator} from '../validators/AtividadesValidator.js';
import {IdValidator} from '../validators/GenericValidator.js';

// Create
router.post('/', authenticateToken, checkPermission('create_atividades'), atividadesValidator, createAtividade);

router.post('/:id/frequencia', authenticateToken, checkPermission('create_atividades'), IdValidator, voluntariosIdValidator, updateFrequenciasAtividade);

// Read
router.get('/', authenticateToken, checkPermission('get_atividades'), getAllAtividades);
router.get('/:id', authenticateToken, checkPermission('get_atividades'), IdValidator, getAtividadeById);

// Update
router.put('/:id', authenticateToken, checkPermission('update_atividades'), IdValidator, atividadesValidator, updateAtividade);



// Delete
router.delete('/:id', authenticateToken, checkPermission('delete_atividades'), IdValidator, deleteAtividade);

export default router;
