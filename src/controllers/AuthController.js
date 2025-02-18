import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import GenericError from '../customErros/GenericError.js';
import argon2 from 'argon2';
let secret = process.env.JWT_SECRET || 'default';

async function checkPassword(senhaRecebida, hashedPassword) {
    const isMatch = await argon2.verify(hashedPassword, senhaRecebida);
    if (isMatch) {
        return true;
    }
    return false;
}


async function authentication(username, password) {

    const query = {
        text: 'SELECT * FROM voluntarios WHERE email = $1',
        values: [username]
    };

    let rs = await pool.query(query);

    if(rs.rowCount <= 0) { 
        return null;
    };
    let senhaCorreta = await checkPassword(password,rs.rows[0].senha);
    if (rs.rowCount > 0 && senhaCorreta) {
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
    if(!username || !password){
        return next(new GenericError(401, 'Credenciais inválidas.'));
    }
    const userData = await authentication(username,password);
    if(userData){
        let token = await tokenGeneration(userData.id, userData.username, userData.permissions)
        return res.status(200).json({ token: token });
    }
    return next(new GenericError(403, 'Acesso Negado!'));
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