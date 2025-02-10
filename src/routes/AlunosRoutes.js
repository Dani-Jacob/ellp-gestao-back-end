import express from 'express';
const router = express.Router();

import {getAllAlunos, getAlunoById, updateAluno, deleteAluno, createAluno, getResponsaveisByAluno} from '../controllers/AlunosController.js';
import {authenticateToken} from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//Validacoes
import {alunoValidator} from '../validators/AlunoValidator.js';
import {IdValidator} from '../validators/GenericValidator.js';


//Create
router.post('/', authenticateToken, checkPermission('create_alunos'), alunoValidator ,createAluno); 

//Read
router.get('/', authenticateToken, checkPermission('get_alunos'), getAllAlunos);
router.get('/:id',authenticateToken, checkPermission('get_alunos'), IdValidator, getAlunoById);
router.get('/:id/responsaveis', authenticateToken, checkPermission('get_alunos'), checkPermission("get_responsaveis"), IdValidator, getResponsaveisByAluno);

//Update
router.put('/:id',authenticateToken, checkPermission('update_alunos'), alunoValidator, updateAluno);

//Delete
router.delete('/:id',authenticateToken, checkPermission('delete_alunos'), IdValidator, deleteAluno);


export default router;