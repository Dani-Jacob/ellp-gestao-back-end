import express from 'express';
const router = express.Router();

import { getAllOficinas, getOficinaById, createOficina, updateOficina, deleteOficina } from '../controllers/OficinasController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

import {oficinasValidator} from '../validators/OficinasValidator.js';
import {IdValidator} from '../validators/GenericValidator.js';

//create
router.post('/', authenticateToken, checkPermission('create_oficinas'),oficinasValidator, createOficina);


//read
router.get('/', authenticateToken, checkPermission('get_oficinas'), getAllOficinas);
router.get('/:id', authenticateToken, checkPermission('get_oficinas'), IdValidator, getOficinaById);

//update
router.put('/:id', authenticateToken, checkPermission('update_oficinas'),oficinasValidator, IdValidator, updateOficina);

//delete
router.delete('/:id', authenticateToken, checkPermission('delete_oficinas'),IdValidator, deleteOficina);



export default router