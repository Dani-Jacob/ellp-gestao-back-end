import { body } from 'express-validator';

import validationResultMiddleware from '../middlewares/ValidationResultMiddleware.js';

const oficinasValidator = [
        body('nome')
            .notEmpty().withMessage('O nome da oficina é obrigatório')
            .isString().withMessage('O nome da oficina deve ser uma string'),
    
        body('ano')
            .isLength({ min: 4, max: 4 }).withMessage('O ano deve ter exatamente 4 caracteres')
            .isNumeric().withMessage('O ano deve ser um valor numérico')
            .notEmpty().withMessage('O ano é obrigatório'),
    
        body('periodo')
            .isInt({ gt: 0 }).withMessage('O período deve ser um número inteiro maior que 0')
            .notEmpty().withMessage('O período é obrigatório'),
    
        body('professor')
            .optional()
            .isString().withMessage('O nome do professor, se fornecido, deve ser uma string'),
    
        body('turno')
            .notEmpty().withMessage('O turno é obrigatório')
            .isString().withMessage('O turno deve ser uma string'),
    
        body('ativo')
            .optional()
            .isBoolean().withMessage('O campo ativo deve ser um valor booleano'),

    validationResultMiddleware
];

export {
    oficinasValidator
};


