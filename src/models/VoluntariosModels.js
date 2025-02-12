import pool from '../config/db.js';
import argon2 from 'argon2';

async function getVoluntarioByIdModel(id) {
    const result = await pool.query(`
        SELECT v.id AS id_voluntario, v.nome AS nome_voluntario, v.ra, v.telefone, v.cpf, v.email, v.curso, v.ativo, 
       v.endereco, v.bairro, v.cep, v.data_cadastro, 
       c.id AS id_cargo, c.nome AS nome_cargo, 
       d.id AS id_departamento, d.nome AS nome_departamento
        FROM voluntarios v
        LEFT JOIN cargos c ON v.cargo_id = c.id
        LEFT JOIN departamentos d ON v.id_departamento = d.id
        WHERE v.id = $1;`, [id]);

    return result;
}

async function getVoluntarioByCpfModel(cpf) {
    const result = await pool.query(`
        SELECT 
            id, 
            nome, 
            ra, 
            telefone, 
            cpf, 
            email, 
            curso, 
            ativo, 
            endereco, 
            bairro, 
            cep, 
            data_cadastro, 
            cargo_id, 
            id_departamento
        FROM voluntarios
    WHERE cpf = $1`, [cpf]);
    return result;
}

async function getVoluntarioByEmailModel(email) {
    const result = await pool.query(`
        SELECT 
            id, 
            nome, 
            ra, 
            telefone, 
            cpf, 
            email, 
            curso, 
            ativo, 
            endereco, 
            bairro, 
            cep, 
            data_cadastro, 
            cargo_id, 
            id_departamento
        FROM voluntarios
        WHERE email = $1`, [email]);
    return result;
}

async function createVoluntarioModel(nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento) {
    const result = await pool.query(`
        INSERT INTO voluntarios (
            nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, cargo_id, id_departamento;
    `, [nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento]);

    return result;
}

async function getAllVoluntariosModel() {
    const result = await pool.query(`SELECT v.id AS id_voluntario, v.nome AS nome_voluntario, v.ra, v.telefone, v.cpf, v.email, v.curso, v.ativo, 
       v.endereco, v.bairro, v.cep, v.data_cadastro, 
       c.id AS id_cargo, c.nome AS nome_cargo, 
       d.id AS id_departamento, d.nome AS nome_departamento
        FROM voluntarios v
        LEFT JOIN cargos c ON v.cargo_id = c.id
        LEFT JOIN departamentos d ON v.id_departamento = d.id;`);
    return result;
}



async function updateVoluntarioModel(id,nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento) {
    const result = await pool.query(`
        UPDATE voluntarios
        SET 
            nome = $1,
            ra = $2,
            telefone = $3,
            cpf = $4,
            email = $5,
            curso = $6,
            ativo = $7,
            endereco = $8,
            bairro = $9,
            cep = $10,
            cargo_id = $12,
            id_departamento = $13
        WHERE id = $14
        RETURNING id, nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, cargo_id, id_departamento;

    `, [nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento, id]);

    return result;
}


async function deleteVoluntarioModel(id) {
    const result = await pool.query('DELETE FROM voluntarios WHERE id = $1', [id]);

    return result;
}

async function addFrequenciaVoluntarioAtividadeModel(id, id_atividade) {
    const atividade = await pool.query('SELECT * FROM atividade WHERE id = $1', [id_atividade]);
    if (atividade.rows.length === 0) {
        return res.status(404).json({ message: "Atividade não encontrada." });
    }

    const rs = await pool.query(`
        INSERT INTO frequencia_voluntarios_atividades (voluntario_id, atividade_id)
        VALUES ($1,$2)
        `,[id,id_atividade]);
        	
    return rs;
}



async function addFrequenciaVoluntarioAulaModel(id, id_aula) {

    const atividade = await pool.query('SELECT * FROM aula WHERE id = $1', [id_aula]);
    if (atividade.rows.length === 0) {
        return res.status(404).json({ message: "Aula não encontrada." });
    }

    const rs = await pool.query(`
        INSERT INTO frequencia_voluntarios_aulas (voluntario_id, aula_id)
        VALUES ($1,$2)
        `,[id,id_aula]);
        	
    return rs;
}

export {
    getVoluntarioByIdModel,
    getVoluntarioByCpfModel,
    getVoluntarioByEmailModel,
    createVoluntarioModel,
    getAllVoluntariosModel,
    updateVoluntarioModel,
    deleteVoluntarioModel,
    addFrequenciaVoluntarioAtividadeModel,
    addFrequenciaVoluntarioAulaModel
};
