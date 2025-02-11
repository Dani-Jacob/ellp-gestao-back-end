import pool from "../config/db.js";

// Create
async function createCargoModel(nome, descricao) {
    const result = await pool.query(`
        INSERT INTO cargos (
            nome,
            descricao
        ) 
        VALUES ($1, $2) 
        RETURNING *
    `, [nome, descricao]);

    return result;
}

// Read
async function getAllCargosModel(req, res) {
    const result = await pool.query('SELECT * FROM cargos');
    return result
}

async function getCargoByIdModel(id) {
    const result = await pool.query('SELECT * FROM cargos WHERE id = $1', [id]);
    return result;
}

async function getCargoByNomeModel(nome) {
    const result = await pool.query('SELECT * FROM cargos WHERE nome = $1', [nome]);
    return result;
}

// Update
async function updateCargoModel(id, nome, descricao) {
    const result = await pool.query(`
        UPDATE cargos
        SET
            nome = $1,
            descricao = $2
        WHERE id = $3
        RETURNING *
    `, [nome, descricao, id]);

    return result;
}

// Delete
async function deleteCargoModel(id) {
    let result = await pool.query('DELETE FROM cargos WHERE id = $1', [id]);
    console.log("Delete cargo: " + result);
    return result
}

export {
    getAllCargosModel,
    getCargoByIdModel,
    createCargoModel,
    updateCargoModel,
    deleteCargoModel,
    getCargoByNomeModel
};
