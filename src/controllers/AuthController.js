const userModel = require('../models/UserModel.js');

login = async (req, res, next) => {
    const { usuario, senha } = req.body;

    const token = await userModel.login(usuario, senha);
    
    if(token == null){
        next(new CustomError(401, 'Credenciais inválidas.'));
    }
    res.status(200).json({ token });
}

export default login;