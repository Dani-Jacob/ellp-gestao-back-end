import pool from '../config/db.js';

async function createResponsavel(req, res) {
    const { nome, telefone, cpf, email, tipo_parentesco, id_aluno } = req.body;
    const existingResponsavel = await pool.query('SELECT * FROM responsaveis WHERE cpf = $1', [cpf]);
    if (existingResponsavel.rows.length > 0) {
        return res.status(400).json({ message: "Já existe um responsável com esse CPF." });
    }
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
    const result2 = await pool.query(
        `
        INSERT INTO responsaveis_alunos (responsavel_id, aluno_id)
        VALUES(${result.rows[0].id},$1)
        `, [id_aluno]);
    res.status(201).json(result.rows[0]); 
}

async function getAllResponsaveis(req, res) {
    const result = await pool.query('SELECT * FROM responsaveis');
    res.status(200).json(result.rows); 
}

async function getResponsavelById(req, res) {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM responsaveis WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Responsável não encontrado." });
    }
    res.status(200).json(result.rows[0]); 
}

async function updateResponsavel(req, res) {
    const { id } = req.params;
    const { nome, telefone, cpf, email, tipo_parentesco } = req.body;
    const responsavel = await pool.query('SELECT * FROM responsaveis WHERE id = $1', [id]);
    if (responsavel.rows.length === 0) {
        return res.status(404).json({ message: "Responsável não encontrado." });
    }
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
    res.status(200).json(result.rows[0]);
}

async function deleteResponsavel(req, res) {
    const { id } = req.params;
    const responsavel = await pool.query('SELECT * FROM responsaveis WHERE id = $1', [id]);
    if (responsavel.rows.length === 0) {
        return res.status(404).json({ message: "Responsável não encontrado." });
    }
    await pool.query('DELETE FROM responsaveis_alunos WHERE responsavel_id = $1', [id]);
    await pool.query('DELETE FROM responsaveis WHERE id = $1', [id]);
    res.status(200).json({ message: "Responsável deletado com sucesso." });
}


export{
    createResponsavel,
    getResponsavelById,
    updateResponsavel,
    deleteResponsavel,
    getAllResponsaveis
}