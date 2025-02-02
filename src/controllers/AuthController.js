import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import GenericError from '../customErros/GenericError.js';
let secret = process.env.JWT_SECRET || 'default';

async function authentication(username, password) {

    const query = {
        text: 'SELECT * FROM voluntarios WHERE email = $1 AND senha = $2',
        values: [username, password]
    };

    let rs = await pool.query(query);

    if (rs.rowCount > 0) {
        const queryPermissions = {
            text: `SELECT permissoes.id, permissoes.nome, permissoes.descricao
                FROM permissoes
                JOIN cargos_permissoes ON permissoes.id = cargos_permissoes.permissao_id
                JOIN cargos ON cargos.id = cargos_permissoes.cargo_id
                WHERE cargos.id = $1`,
            values: [rs.rows[0].cargo_id]
        };
        const permissions = await pool.query(queryPermissions);
        return{
            id: rs.rows[0].id,
            username: rs.rows[0].username,
            permissions: permissions.rows.map(linha=> linha.nome)
        }
    }
    return null;

}

function tokenGeneration(id, username, permissions) {

    const payload = {
        id: id,
        username: username,
        permissions: permissions
    };

    let expiresIn = process.env.JWT_EXPIRES_IN || '1800s';
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

const generateToken = async (req, res, next) => {
    const { username, password } = req.body;
    const userData = await authentication(username,password);
    if(userData){
        let token = await tokenGeneration(userData.id, userData.username, userData.permissions)
        return res.status(200).json({ token: token });
    }
    return next(new GenericError(403, 'Credenciais inválidas!'));
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(authHeader){
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        if (token){
            jwt.verify(token, secret, function(err, user) { 
                if (err){ 
                    return next(new GenericError(403, 'Acesso Negado!'));
                }
                req.user = user; 
                console.log(req.user.permissions);
                });
            return next();
        }
    }
    return next(new GenericError(401, 'Credenciais inválidas.'));
}

export {
    generateToken,
    authenticateToken
}