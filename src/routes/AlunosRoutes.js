import express from 'express';
const router = express.Router();

import {getAllAlunos} from '../controllers/AlunosController.js';
import {authenticateToken} from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//Create
router.post('/'); 

//Read
router.get('/', authenticateToken, checkPermission("get_alunos"), getAllAlunos);
router.get('/:id',authenticateToken, checkPermission("get_alunos"));

//Update
router.put('/:id',authenticateToken, checkPermission("update_alunos"));

//Delete
router.delete('/:id',authenticateToken, checkPermission("delete_alunos"));


export default router;