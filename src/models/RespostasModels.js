import pool from '../config/db.js';

async function getAllRespostasModel() {
    const result = await pool.query(`
        SELECT * FROM respostas
        `);
    return result;
}

async function postRespostaByAlunoModel(aluno_id, pergunta_id,resposta_texto) {
    const result = pool.query(`
        INSERT INTO respostas (aluno_id, pergunta_id, resposta_texto)
        VALUES($1,$2,$3)
        RETURNING *
        `,[aluno_id,pergunta_id,resposta_texto])
        return result;
}

export {
    postRespostaByAlunoModel,
    getAllRespostasModel
};