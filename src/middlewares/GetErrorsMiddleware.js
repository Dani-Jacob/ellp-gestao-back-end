
import GenericError from '../customErros/GenericError.js';
import ValidationError from '../customErros/ValidationError.js'; 

const getErrorsMidleware = (err, req, res, next) => {
    if (err instanceof GenericError) {
        return res.status(err.status).json({ error: err.message });
    }
    if (err instanceof ValidationError) { 
        return res.status(err.status).json({
            error: err.message,
            details: err.details,  
        });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
};

export default getErrorsMidleware;
