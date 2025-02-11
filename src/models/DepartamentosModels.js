import pool from "../config/db.js";

// Create
async function createDepartamentoModel(nome) {
    const result = await pool.query(`
        INSERT INTO departamentos (
            nome
        ) 
        VALUES ($1) 
        RETURNING *
    `, [nome]);

    return result;
}

// Read
async function getAllDepartamentosModel() {
    const result = await pool.query('SELECT * FROM departamentos');
    return result;
}

async function getDepartamentoByNomeModel(nome) {
    const result = await pool.query('SELECT * FROM departamentos WHERE nome = $1', [nome]);
    return result;
}

async function getDepartamentoByIdModel(id) {
    const result = await pool.query('SELECT * FROM departamentos WHERE id = $1', [id]);
    return result;
}

// Update
async function updateDepartamentoModel(id,nome) {
    const result = await pool.query(`
        UPDATE departamentos
        SET
            nome = $1
        WHERE id = $2
        RETURNING *
    `, [nome, id]);

    return result;
}

// Delete
async function deleteDepartamentoModel(id) {
    await pool.query('DELETE FROM departamentos WHERE id = $1', [id]);

    return result;
}

export {
    getAllDepartamentosModel,
    getDepartamentoByIdModel,
    createDepartamentoModel,
    updateDepartamentoModel,
    deleteDepartamentoModel,
    getDepartamentoByNomeModel
};
