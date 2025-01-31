import express from 'express';
const router = express.Router();

import {getAllAlunos} from '../controllers/AlunosController.js';

//Create
router.post('/'); 

//Read
router.get('/',getAllAlunos);
router.get('/:id');

//Update
router.put('/:id');

//Delete
router.delete('/:id');


export default router;