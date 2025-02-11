import express from 'express';
const router = express.Router();

import { getAllAulas, getAulaById, createAula, updateAula, deleteAula } from '../controllers/AulasController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';


import {aulasValidator} from '../validators/AulasValidator.js';
import {IdValidator} from '../validators/GenericValidator.js';
//create
router.post('/', authenticateToken, checkPermission('create_aulas'),aulasValidator, createAula);

//read
router.get('/', authenticateToken, checkPermission('get_aulas'), getAllAulas);
router.get('/:id', authenticateToken, checkPermission('get_aulas'),IdValidator, getAulaById);

//update
router.put('/:id', authenticateToken, checkPermission('update_aulas'),IdValidator, aulasValidator, updateAula);

//delete
router.delete('/id', authenticateToken, checkPermission('delete_aulas'),IdValidator, deleteAula);

export default router