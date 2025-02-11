import pool from "../config/db.js";


async function getAulaByIdModel(id){
    const result = await pool.query('SELECT * FROM aulas WHERE id = $1', [id]);
    return result;
}

async function createAulaModel(data_aula, oficina_id, horas){
    const result = await pool.query(`
        INSERT INTO aulas (
            data_aula, 
            oficina_id,
            horas
        ) 
        VALUES ($1, $2, $3) 
        RETURNING *
    `, [data_aula, oficina_id, horas]);
    return result;
}

async function getAllAulasModel(){
    const result = await pool.query('SELECT * FROM aulas');
    return result;
}

async function updateAulaModel(id, data_aula, oficina_id, horas ) {
    const result = await pool.query(`
            UPDATE aulas
            SET
                data_aula = $1,
                oficina_id = $2,
                horas = $3
            WHERE id = $4
            RETURNING *
        `, [data_aula, oficina_id, horas, id]);

    return result;
}

async function deleteAulaModel(id){
    const result = await pool.query('DELETE FROM aulas WHERE id = $1', [id])
    return result;
}

async function getFrequenciaAlunosByAulaModel(id) {
    const result = await pool.query(`SELECT 
    al.id AS aluno_id, 
    al.nome AS aluno_nome
    FROM alunos al
    JOIN frequencia_alunos_aulas fa ON al.id = fa.aluno_id
    JOIN aulas a ON fa.aula_id = a.id
    JOIN oficinas o ON a.oficina_id = o.id
    WHERE a.id = $1;`, [id]);
    return result;
}

export{
    getAulaByIdModel,
    createAulaModel,
    getAllAulasModel,
    updateAulaModel, 
    deleteAulaModel,
    getFrequenciaAlunosByAulaModel
}