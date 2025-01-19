import express from 'express';
const router = express.Router();

//Create
router.post('/'); 

//Read
router.get('/');
router.get('/:id');

//Update
router.put('/:id');

//Delete
router.delete('/:id');


export default router;