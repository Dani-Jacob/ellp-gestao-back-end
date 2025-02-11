import pool from '../config/db.js';
import argon2 from 'argon2';


async function createVoluntario(req, res) {
    const { nome, ra, telefone, cpf, email, curso, endereco, bairro, cep, senha, cargo_id, id_departamento } = req.body;

    const existingVoluntario = await pool.query('SELECT * FROM voluntarios WHERE cpf = $1', [cpf]);
    if (existingVoluntario.rows.length > 0) {
        return res.status(400).json({ message: "Já existe um voluntário com esse CPF." });
    }

    const existingEmail = await pool.query('SELECT * FROM voluntarios WHERE email = $1', [email]);
    if (existingEmail.rows.length > 0) {
        return res.status(400).json({ message: "Já existe um voluntário com esse e-mail." });
    }

    const existingCargo = await pool.query('SELECT * FROM cargos WHERE id = $1',[cargo_id]);
    if (existingCargo.rows.length <= 0) {
        return res.status(400).json({ message: "Cargo não existe." });
    }

    const existingDepartamento = await pool.query('SELECT * FROM departamentos WHERE id = $1',[id_departamento]);
    if (existingDepartamento.rows.length <= 0) {
        return res.status(400).json({ message: "Departamento não existe." });
    }

    const hashedPassword = await argon2.hash(senha, { type: argon2.argon2id });

    const result = await pool.query(`
        INSERT INTO voluntarios (
            nome, ra, telefone, cpf, email, curso, endereco, bairro, cep, senha, cargo_id, id_departamento
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
    `, [nome, ra, telefone, cpf, email, curso, endereco, bairro, cep, hashedPassword, cargo_id, id_departamento]);

    res.status(201).json(result.rows[0]);
}

async function getAllVoluntarios(req, res) {
    const result = await pool.query(`SELECT v.id AS id_voluntario, v.nome AS nome_voluntario, v.ra, v.telefone, v.cpf, v.email, v.curso, v.ativo, 
       v.endereco, v.bairro, v.cep, v.senha, v.data_cadastro, 
       c.id AS id_cargo, c.nome AS nome_cargo, 
       d.id AS id_departamento, d.nome AS nome_departamento
        FROM voluntarios v
        LEFT JOIN cargos c ON v.cargo_id = c.id
        LEFT JOIN departamentos d ON v.id_departamento = d.id;`);
    res.status(200).json(result.rows);
}

async function getVoluntarioById(req, res) {
    const { id } = req.params;
    const result = await pool.query(`
        SELECT v.id AS id_voluntario, v.nome AS nome_voluntario, v.ra, v.telefone, v.cpf, v.email, v.curso, v.ativo, 
       v.endereco, v.bairro, v.cep, v.senha, v.data_cadastro, 
       c.id AS id_cargo, c.nome AS nome_cargo, 
       d.id AS id_departamento, d.nome AS nome_departamento
        FROM voluntarios v
        LEFT JOIN cargos c ON v.cargo_id = c.id
        LEFT JOIN departamentos d ON v.id_departamento = d.id
        WHERE v.id = $1;`, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    res.status(200).json(result.rows[0]);
}

async function updateVoluntario(req, res) {
    const { id } = req.params;
    const { nome, ra, telefone, cpf, email, curso, endereco, bairro, cep, senha, cargo_id, id_departamento } = req.body;

    const voluntario = await pool.query('SELECT * FROM voluntarios WHERE id = $1', [id]);
    if (voluntario.rows.length === 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    const result = await pool.query(`
        UPDATE voluntarios
        SET 
            nome = $1,
            ra = $2,
            telefone = $3,
            cpf = $4,
            email = $5,
            curso = $6,
            endereco = $7,
            bairro = $8,
            cep = $9,
            senha = $10,
            cargo_id = $11,
            id_departamento = $12
        WHERE id = $13
        RETURNING *
    `, [nome, ra, telefone, cpf, email, curso, endereco, bairro, cep, senha, cargo_id, id_departamento, id]);

    res.status(200).json(result.rows[0]);
}


async function deleteVoluntario(req, res) {
    const { id } = req.params;

    const voluntario = await pool.query('SELECT * FROM voluntarios WHERE id = $1', [id]);
    if (voluntario.rows.length === 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    await pool.query('DELETE FROM voluntarios WHERE id = $1', [id]);

    res.status(200).json({ message: "Voluntário deletado com sucesso." });
}

export {
    createVoluntario,
    getVoluntarioById,
    updateVoluntario,
    deleteVoluntario,
    getAllVoluntarios
};
