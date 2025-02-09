import express from 'express';
const router = express.Router();


import {authenticateToken} from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';

//Create
router.post('/', authenticateToken, checkPermission("create_voluntarios"), ); 

//Read
router.get('/', authenticateToken, checkPermission("get_voluntarios"), );
router.get('/:id',authenticateToken, checkPermission("get_voluntarios"), );

//Update
router.put('/:id',authenticateToken, checkPermission("update_voluntarios"), );

//Delete
router.delete('/:id',authenticateToken, checkPermission("delete_voluntarios"), );


export default router;