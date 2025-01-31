import express from 'express';
import authController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/', authController);

export default router;