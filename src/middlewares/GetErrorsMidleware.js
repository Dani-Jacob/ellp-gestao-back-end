import GenericError from '../customErros/GenericError.js';

const errorHandler = (err, req, res, next) => {
    console.log("Dentro do md: " + err);
    if (err instanceof GenericError) {
        return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
};

export default errorHandler;
