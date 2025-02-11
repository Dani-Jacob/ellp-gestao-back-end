import express from 'express';
const router = express.Router();

import { getAllAulas, getAulaById, createAula, updateAula, deleteAula } from '../controllers/AulasController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//create
router.post('/', authenticateToken, checkPermission('create_aulas'), createAula);

//read
router.get('/', authenticateToken, checkPermission('get_aulas'), getAllAulas);
router.get('/:id', authenticateToken, checkPermission('get_aulas'), getAulaById);

//update
router.put('/:id', authenticateToken, checkPermission('update_aulas'), updateAula);

//delete
router.delete('/id', authenticateToken, checkPermission('delete_aulas'), deleteAula);

export default router