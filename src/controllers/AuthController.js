import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

function authentication(username, password) {

    const query = {
        text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
        values: [username, password]
    };
    const rs = pool.query(query);

    const queryPermissions = {
        text: 'SELECT * FROM cargos_permissoes WHERE cargo_id = $1',
        values: [rs[0].cargo_id]
    };

    if (rs.length > 0) {
        const permissions = pool.query(queryPermissions);
        return tokenGeneration(rs[0].id, rs[0].username, permissions);
    }
    return null;

}

function tokenGeneration(id, username, permissions) {

    const payload = {
        id: id,
        username: username,
        permissions: permissions
    };

    let secret = process.env.JWT_SECRET || 'default';
    let expiresIn = process.env.JWT_EXPIRES_IN || '1800s';
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

const login = async (req, res, next) => {
    const { username, password } = req.body;

    const token = authentication(username, password);
    if (token == null) {
        next(new CustomError(401, 'Credenciais inválidas.'));
    }
    res.status(200).json({ token });
}

export default login;