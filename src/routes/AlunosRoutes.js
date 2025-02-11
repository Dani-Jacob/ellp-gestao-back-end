import express from 'express';
const router = express.Router();

import {getAllAlunos, getAlunoById, updateAluno, deleteAluno, createAluno, getResponsaveisByAluno, getRespostasByAluno, addAlunoOficina, addFrequenciaAlunoAula, getFrequenciasAulasByAluno} from '../controllers/AlunosController.js';
import {authenticateToken} from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//Validacoes
import {alunoValidator} from '../validators/AlunosValidator.js';
import {IdValidator, aulaIdValidator, oficinaIdValidator} from '../validators/GenericValidator.js';


//Criar aluno
router.post('/', authenticateToken, checkPermission('create_alunos'), alunoValidator ,createAluno); 

//Obter todos os alunos
router.get('/', authenticateToken, checkPermission('get_alunos'), getAllAlunos);

//Obter aluno por ID
router.get('/:id',authenticateToken, checkPermission('get_alunos'), IdValidator, getAlunoById);

//Obter responsaveis do aluno
router.get('/:id/responsaveis', authenticateToken, checkPermission('get_alunos'), checkPermission("get_responsaveis"), IdValidator, getResponsaveisByAluno);

//Obter respostas socio economicas do aluno
router.get('/:id/respostas', authenticateToken, checkPermission('get_alunos'), checkPermission("get_respostas"), IdValidator, getRespostasByAluno);

//Obter frequencia do aluno nas aulas
router.get('/:id/frequencia-aulas', authenticateToken, checkPermission('get_alunos'), checkPermission("get_respostas"), IdValidator, getFrequenciasAulasByAluno);

//Atualizar os dados de um aluno
router.put('/:id',authenticateToken, checkPermission('update_alunos'), alunoValidator, updateAluno);

//Deletar um aluno
router.delete('/:id',authenticateToken, checkPermission('delete_alunos'), IdValidator, deleteAluno);

//Adicionar um aluno em uma oficina
router.post('/:id/oficina/oficina_id', authenticateToken, checkPermission('create_alunos'), IdValidator, oficinaIdValidator, addAlunoOficina); 

//Adicionar frequencia de um aluno em uma aula
router.post('/:id/frequencia-aula/:aula_id', authenticateToken, checkPermission('create_alunos'), IdValidator, aulaIdValidator, addFrequenciaAlunoAula); 

export default router;