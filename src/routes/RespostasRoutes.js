import express from 'express';

import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

import {
    getAllRespostas,
    postRespostaByAluno
} from '../controllers/RespostasController.js';

const router = express.Router();

router.get('/', authenticateToken, checkPermission('get_respostas'), getAllRespostas);

router.post('/',authenticateToken, checkPermission('create_respostas'),postRespostaByAluno)

export default router;