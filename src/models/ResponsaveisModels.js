import pool from '../config/db.js';



async function createResponsavelModel(nome, telefone, cpf, email, tipo_parentesco) {
    const result = await pool.query(`
            INSERT INTO responsaveis (
                nome, 
                telefone, 
                cpf, 
                email, 
                tipo_parentesco
            ) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
        `, [nome, telefone, cpf, email, tipo_parentesco]);
    return result;
}

async function getAllResponsaveisModel() {
    const result = await pool.query('SELECT * FROM responsaveis');
    return result
}

async function getResponsavelByIdModel(id) {
    const result = await pool.query('SELECT * FROM responsaveis WHERE id = $1', [id]);
    return result;
}

async function updateResponsavelModel(id, nome, telefone, cpf, email, tipo_parentesco) {
    const result = await pool.query(`
        UPDATE responsaveis
        SET 
            nome = $1,
            telefone = $2,
            cpf = $3,
            email = $4,
            tipo_parentesco = $5
        WHERE id = $6
        RETURNING *
    `, [nome, telefone, cpf, email, tipo_parentesco, id]);
    return result;
}

async function deleteResponsavelModel(id) {
    const result = await pool.query('DELETE FROM responsaveis_alunos WHERE responsavel_id = $1', [id]);
    await pool.query('DELETE FROM responsaveis WHERE id = $1', [id]);
    return result;
}

async function getResponsavelByCpfModel(cpf) {
    const result = await pool.query('SELECT * FROM responsaveis WHERE cpf = $1', [cpf]);
    return result;
}

export{
    createResponsavelModel,
    getResponsavelByIdModel,
    updateResponsavelModel,
    deleteResponsavelModel,
    getAllResponsaveisModel,
    getResponsavelByCpfModel
}