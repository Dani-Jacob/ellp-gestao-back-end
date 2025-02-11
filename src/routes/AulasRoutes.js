import express from 'express';
const router = express.Router();

import { getAllAulas, getAulaById, createAula, updateAula, deleteAula, getFrequenciaAlunosByAula } from '../controllers/AulasController.js';
import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';


import {aulasValidator} from '../validators/AulasValidator.js';
import {IdValidator} from '../validators/GenericValidator.js';

//Criar aula
router.post('/', authenticateToken, checkPermission('create_aulas'),aulasValidator, createAula);

//Obter todas as aulas
router.get('/', authenticateToken, checkPermission('get_aulas'), getAllAulas);

//Obter aula por id
router.get('/:id', authenticateToken, checkPermission('get_aulas'),IdValidator, getAulaById);

//Atualizar aula
router.put('/:id', authenticateToken, checkPermission('update_aulas'),IdValidator, aulasValidator, updateAula);

//Deletar aula
router.delete('/id', authenticateToken, checkPermission('delete_aulas'),IdValidator, deleteAula);

//Obter todas as frenquecias na aula
router.get('/:id/frequencias-alunos', authenticateToken, checkPermission('get_aulas'), checkPermission('get_alunos'),IdValidator, getFrequenciaAlunosByAula);

export default router