import express from 'express';
import {generateToken} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/', generateToken);

export default router;