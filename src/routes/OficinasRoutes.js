import express from 'express';
const router = express.Router();

import { getAllOficinas, getOficinaById, createOficina, updateOficina, deleteOficina } from '../controllers/OficinasController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//create
router.post('/', authenticateToken, checkPermission('create_oficinas'), createOficina)

//read
router.get('/', authenticateToken, checkPermission('get_oficinas'), getAllOficinas)
router.get('/:id', authenticateToken, checkPermission('get_oficinas'), getOficinaById)

//update
router.put('/:id', authenticateToken, checkPermission('update_oficinas'), updateOficina)

//delete
router.delete('/:id', authenticateToken, checkPermission('delete_oficinas'), deleteOficina)

export default router