import { body } from 'express-validator';
import validationResultMiddleware from '../middlewares/ValidationResultMiddleware.js';

const voluntarioValidator = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório.')
    .isLength({ max: 255 }).withMessage('Nome não pode ter mais que 255 caracteres.'),

  body('ra')
    .notEmpty().withMessage('RA é obrigatório.')
    .isLength({ max: 20 }).withMessage('RA não pode ter mais que 20 caracteres.'),

  body('telefone')
    .notEmpty().withMessage('Telefone é obrigatório.'),

  body('cpf')
    .notEmpty().withMessage('CPF é obrigatório.')
    .isLength({ min: 11, max: 11 }).withMessage('CPF não pode ter mais ou menos que 11 caracteres.'),

  body('email')
    .isEmail().withMessage('E-mail inválido.')
    .normalizeEmail()
    .notEmpty().withMessage('E-mail é obrigatório.')
    .isLength({ max: 255 }).withMessage('E-mail não pode ter mais que 255 caracteres.'),

  body('curso')
    .notEmpty().withMessage('Curso é obrigatório.')
    .isLength({ max: 100 }).withMessage('Curso não pode ter mais que 100 caracteres.'),

  body('endereco')
    .notEmpty().withMessage('Endereço é obrigatório.')
    .isLength({ max: 100 }).withMessage('Endereço não pode ter mais que 100 caracteres.'),

  body('bairro')
    .notEmpty().withMessage('Bairro é obrigatório.')
    .isLength({ max: 100 }).withMessage('Bairro não pode ter mais que 100 caracteres.'),

  body('cep')
    .notEmpty().withMessage('CEP é obrigatório.')
    .isLength({ min: 8, max: 8 }).withMessage('CEP deve ter 8 caracteres.'),

  body('senha')
    .notEmpty().withMessage('Senha é obrigatória.')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres.'),

  body('cargo_id')
    .optional()
    .isInt().withMessage('Cargo deve ser um número inteiro.'),

  body('id_departamento')
    .optional()
    .isInt().withMessage('Departamento deve ser um número inteiro.'),
    
    validationResultMiddleware
];



export {voluntarioValidator};
