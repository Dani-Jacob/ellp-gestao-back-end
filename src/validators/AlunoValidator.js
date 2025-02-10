import { body } from 'express-validator';

import validationResultMiddleware from '../middlewares/ValidationResultMiddleware.js';

const alunoValidator = [
    body('nome')
        .isString().withMessage('O nome deve ser uma string')
        .notEmpty().withMessage('O nome é obrigatório'),

    body('data_nascimento')
        .isDate({ format: 'DD/MM/YYYY' }).withMessage('A data de nascimento deve ser válida'),

    body('cpf')
        .isLength({ min: 11, max: 11 }).withMessage('O CPF deve ter 11 caracteres')
        .matches(/^\d+$/).withMessage('O CPF deve conter apenas números'),

    body('cep')
        .isLength({ min: 8, max: 8 }).withMessage('O CEP deve ter 8 caracteres')
        .matches(/^\d+$/).withMessage('O CEP deve conter apenas números'),

    body('ativo')
        .isBoolean().withMessage('O campo ativo deve ser um valor booleano'),

    body('necessidades_especiais')
        .isBoolean().withMessage('O campo de necessidades especiais deve ser um valor booleano'),

    body('endereco')
        .isString().withMessage('O endereço deve ser uma string')
        .notEmpty().withMessage('O endereço é obrigatório'),

    body('bairro')
        .isString().withMessage('O bairro deve ser uma string')
        .notEmpty().withMessage('O bairro é obrigatório'),

    body('escola')
        .optional()
        .isString().withMessage('A escola deve ser uma string'),

    body('ano_escolar')
        .optional()
        .isInt().withMessage('O ano escolar deve ser um número inteiro'),

    body('observacao')
        .optional()
        .isString().withMessage('A observação deve ser uma string'),
    
    validationResultMiddleware
];

export {
    alunoValidator
};


