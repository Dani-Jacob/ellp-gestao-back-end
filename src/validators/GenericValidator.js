import { query, param } from 'express-validator';
import { validationResult } from 'express-validator';
import validationResultMiddleware from '../middlewares/ValidationResultMiddleware.js';

const paginationValidator = [
    query('limite')
        .isInt({ min: 5, max: 30 })
        .custom(value => [5, 10, 30].includes(Number(value)))
        .withMessage('O limite deve ser 5, 10 ou 30'),
    query('pagina')
        .isInt({ min: 1 })
        .withMessage('A página deve ser um número inteiro maior ou igual a 1')
];

const IdValidator = [
    param('id').isInt({ min: 0 }).withMessage('O ID deve ser um número inteiro positivo'),
    
    validationResultMiddleware
];

const aulaIdValidator = [
    param('aula_id').isInt({ min: 0 }).withMessage('O ID deve ser um número inteiro positivo'),
    
    validationResultMiddleware
];
const oficinaIdValidator = [
    param('oficina_id').isInt({ min: 0 }).withMessage('O ID deve ser um número inteiro positivo'),
    
    validationResultMiddleware
];

const responsavelIdValidator = [
    param('responsavel_id').isInt({ min: 0 }).withMessage('O ID deve ser um número inteiro positivo'),
    
    validationResultMiddleware
];

const perguntaIdValidator = [
    param('pergunta_id').isInt({ min: 0 }).withMessage('O ID deve ser um número inteiro positivo'),
    
    validationResultMiddleware
];


export {
    paginationValidator,
    IdValidator,
    aulaIdValidator,
    oficinaIdValidator,
    responsavelIdValidator,
    perguntaIdValidator
};