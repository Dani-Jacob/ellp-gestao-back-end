import { body } from 'express-validator';
import validationResultMiddleware from '../middlewares/ValidationResultMiddleware.js';

const responsavelValidator = [
    // Validação do campo nome
    body('nome')
        .isString()
        .withMessage('O nome é obrigatório e deve ser uma string')
        .notEmpty()
        .withMessage('O nome não pode estar vazio')
        .isLength({ max: 100 })
        .withMessage('O nome não pode ultrapassar 100 caracteres'),

    // Validação do campo telefone
    body('telefone')
        .matches(/^\d+$/)
        .withMessage('O telefone deve conter apenas números'),

    // Validação do campo CPF (opcional, se informado)
    body('cpf')
        .optional()
        .matches(/^\d{11}$/)
        .withMessage('O CPF deve conter apenas números'),

    // Validação do campo email (opcional)
    body('email')
        .optional()
        .isEmail()
        .withMessage('O email deve ser válido')
        .isLength({ max: 100 })
        .withMessage('O email não pode ultrapassar 100 caracteres'),

    // Validação do tipo de parentesco (opcional)
    body('tipo_parentesco')
        .optional()
        .isString()
        .withMessage('O tipo de parentesco deve ser uma string')
        .isLength({ max: 100 })
        .withMessage('O tipo de parentesco não pode ultrapassar 100 caracteres'),
    
    validationResultMiddleware
];

export default responsavelValidator;
