import express from 'express';
const router = express.Router();

import {getAllAlunos, getAlunoById, updateAluno, deleteAluno, createAluno, getResponsaveisByAluno} 
from '../controllers/AlunosController.js';
import {authenticateToken} from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//Create
router.post('/', authenticateToken, checkPermission('create_alunos'), createAluno); 

//Read
router.get('/', authenticateToken, checkPermission('get_alunos'), getAllAlunos);
router.get('/:id',authenticateToken, checkPermission('get_alunos'), getAlunoById);
router.get('/:id/responsaveis', authenticateToken, checkPermission('get_alunos'),getResponsaveisByAluno);

//Update
router.put('/:id',authenticateToken, checkPermission('update_alunos'), updateAluno);

//Delete
router.delete('/:id',authenticateToken, checkPermission('delete_alunos'), deleteAluno);


export default router;