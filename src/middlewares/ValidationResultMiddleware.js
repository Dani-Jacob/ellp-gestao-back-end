import { validationResult } from 'express-validator';
import GenericError from '../customErros/GenericError.js';
import ValidationError from '../customErros/ValidationError.js';

const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationError(400,  errors.array() ));
    }
    next(); 
};
export default validationResultMiddleware;
