import express from 'express';
const router = express.router();

import { getAllOficinas, getOficinaById, createOficina, updateOficina, deleteOficina } from '../controllers/OficinasController';
import { authenticateToken } from '../controllers/AuthController';
import checkPermission from '../middlewares/CheckPermissionMiddleware';

//create
router.post('/', authenticateToken, checkPermission('create_oficinas'), createOficina)

//read
router.get('/', authenticateToken, checkPermission('get_oficinas'), getAllOficinas)
router.get('/:id', authenticateToken, checkPermission('get_oficinas'), getOficinaById)

//update
router.put('/:id', authenticateToken, checkPermission('update_oficinas'), updateOficina)

//delete
router.delet('/:id', authenticateToken, checkPermission('delete_oficinas'), deleteOficina)

export default router