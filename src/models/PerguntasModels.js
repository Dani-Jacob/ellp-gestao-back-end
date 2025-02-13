import pool from '../config/db.js';

async function getAllPerguntasModel() {
    const result = await pool.query(`
        SELECT * FROM perguntas
        `);
    return result;
}

export {
    getAllPerguntasModel
};