import express from 'express';
const router = express.Router();

import {getAllAlunos, getAlunoById, updateAluno, deleteAluno, createAluno, getResponsaveisByAluno, getRespostasByAluno, addAlunoOficina, addFrequenciaAlunoAula} from '../controllers/AlunosController.js';
import {authenticateToken} from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//Validacoes
import {alunoValidator} from '../validators/AlunosValidator.js';
import {IdValidator} from '../validators/GenericValidator.js';


//Create
router.post('/', authenticateToken, checkPermission('create_alunos'), alunoValidator ,createAluno); 

//Read
router.get('/', authenticateToken, checkPermission('get_alunos'), getAllAlunos);
router.get('/:id',authenticateToken, checkPermission('get_alunos'), IdValidator, getAlunoById);
router.get('/:id/responsaveis', authenticateToken, checkPermission('get_alunos'), checkPermission("get_responsaveis"), IdValidator, getResponsaveisByAluno);

router.get('/:id/respostas', authenticateToken, checkPermission('get_alunos'), checkPermission("get_respostas"), IdValidator, getRespostasByAluno);

//Update
router.put('/:id',authenticateToken, checkPermission('update_alunos'), alunoValidator, updateAluno);

//Delete
router.delete('/:id',authenticateToken, checkPermission('delete_alunos'), IdValidator, deleteAluno);

//Adicionar na oficina
router.post('/:id/oficina/oficina_id', authenticateToken, checkPermission('create_alunos'), IdValidator ,addAlunoOficina); 

router.post('/:id/frequencia-aula/aula_id', authenticateToken, checkPermission('create_alunos'), IdValidator ,addFrequenciaAlunoAula); 

export default router;