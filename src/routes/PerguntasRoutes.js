import express from 'express';

import { authenticateToken } from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

import {
    getAllPerguntas
} from '../controllers/PerguntasController.js';

const router = express.Router();

router.get('/', authenticateToken, checkPermission('get_perguntas'), getAllPerguntas);

export default router;