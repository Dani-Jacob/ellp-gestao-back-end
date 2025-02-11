import express from 'express';
const router = express.Router();

import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';
import {
    createVoluntario,
    getVoluntarioById,
    updateVoluntario,
    deleteVoluntario,
    getAllVoluntarios,
    addFrequenciaVoluntarioAtividade,
    addFrequenciaVoluntarioAula
} from '../controllers/VoluntariosController.js';

import { IdValidator } from '../validators/GenericValidator.js';
import { voluntarioValidator } from '../validators/VoluntarioValidator.js';

// Create
router.post('/', authenticateToken, checkPermission("create_voluntarios"), voluntarioValidator, createVoluntario);

// Read
router.get('/', authenticateToken, checkPermission("get_voluntarios"), getAllVoluntarios);
router.get('/:id', authenticateToken, checkPermission("get_voluntarios"), IdValidator, getVoluntarioById);

// Update
router.put('/:id', authenticateToken, checkPermission("update_voluntarios"), IdValidator, voluntarioValidator, updateVoluntario);

// Delete
router.delete('/:id', authenticateToken, checkPermission("delete_voluntarios"), IdValidator, deleteVoluntario);

//Frequencias
router.post('/:id/frequencia-atividade/:id_atividade', authenticateToken, checkPermission("create_voluntarios"), IdValidator, addFrequenciaVoluntarioAtividade);
router.post('/:id/frequencia-aula/:id_aula', authenticateToken, checkPermission("create_voluntarios"), IdValidator, addFrequenciaVoluntarioAula);

export default router;
