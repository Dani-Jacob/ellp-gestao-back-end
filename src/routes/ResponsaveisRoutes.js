import express from 'express';
const router = express.Router();


import {authenticateToken} from '../controllers/AuthController.js';
import checkPermission from '../middlewares/CheckPermissionMiddleware.js';
import {
    createResponsavel,
    getResponsavelById,
    updateResponsavel,
    deleteResponsavel,
    getAllResponsaveis
} from '../controllers/ResponsaveisController.js';

import {IdValidator} from '../validators/GenericValidator.js';
import responsavelValidator from '../validators/ResponsaveisValidator.js';

//Create
router.post('/', authenticateToken, checkPermission("create_responsaveis"), responsavelValidator, createResponsavel ); 

//Read
router.get('/', authenticateToken, checkPermission("get_responsaveis"), getAllResponsaveis);
router.get('/:id',authenticateToken, checkPermission("get_responsaveis"), IdValidator, getResponsavelById);

//Update
router.put('/:id',authenticateToken, checkPermission("update_responsaveis"), IdValidator, responsavelValidator, updateResponsavel);

//Delete
router.delete('/:id',authenticateToken, checkPermission("delete_responsaveis"), IdValidator, deleteResponsavel);


export default router;