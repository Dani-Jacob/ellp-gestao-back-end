import { body } from 'express-validator';

import validationResultMiddleware from '../middlewares/ValidationResultMiddleware.js';

const aulasValidator = [
    body('data_aula')
        .isDate({ format: 'DD/MM/YYYY' }).withMessage('A data da aula deve ser uma data válida')
        .notEmpty().withMessage('A data da aula é obrigatória'),

    body('oficina_id')
        .isInt({ gt: 0 }).withMessage('O ID da oficina deve ser um número inteiro válido maior que 0')
        .notEmpty().withMessage('O ID da oficina é obrigatório'),

    body('horas')
        .isInt({ gt: 0 }).withMessage('As horas devem ser um número inteiro válido maior que 0')
        .notEmpty().withMessage('As horas são obrigatórias'),

    validationResultMiddleware
];

export {
    aulasValidator
};


