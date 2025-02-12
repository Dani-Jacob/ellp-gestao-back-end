import { body, param } from 'express-validator';

import validationResultMiddleware from '../middlewares/ValidationResultMiddleware.js';

const atividadesValidator = [
    body('nome')
        .notEmpty().withMessage('O nome da atividade é obrigatório')
        .isString().withMessage('O nome da atividade deve ser uma string'),

    body('data_atividade')
        .isDate({ format: 'DD/MM/YYYY' }).withMessage('A data da atividade deve ser uma data válida')
        .notEmpty().withMessage('A data da atividade é obrigatória'),

    body('observacao')
        .optional()
        .isString().withMessage('A observação, se fornecida, deve ser uma string'),

    body('horas')
        .isInt({ gt: 0 }).withMessage('As horas devem ser um número inteiro maior que 0')
        .notEmpty().withMessage('As horas são obrigatórias'),
        
    validationResultMiddleware
];
const voluntariosIdValidator = [
    body('voluntarios_id')
        .isArray().withMessage('O campo voluntarios_id deve ser um array') 
        .notEmpty().withMessage('O array voluntarios_id não pode ser vazio') 
        .custom((value) => {

            if (value.some((id) => !Number.isInteger(id) || id <= 0)) {
                throw new Error('Todos os voluntarios_id devem ser números inteiros maiores que 0');
            }
            return true;
        }),
        validationResultMiddleware
];


export  {atividadesValidator, voluntariosIdValidator};



