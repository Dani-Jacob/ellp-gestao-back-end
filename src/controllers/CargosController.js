import pool from "../config/db.js";

// Create
async function createCargo(req, res) {
    const { nome, descricao } = req.body;

    const existingCargo = await pool.query('SELECT * FROM cargos WHERE nome = $1', [nome]);

    if (existingCargo.rows.length > 0) {
        return res.status(400).json({ message: "Já existe um cargo com esse nome" });
    }

    const result = await pool.query(`
        INSERT INTO cargos (
            nome,
            descricao
        ) 
        VALUES ($1, $2) 
        RETURNING *
    `, [nome, descricao]);

    res.status(201).json(result.rows[0]);
}

// Read
async function getAllCargos(req, res) {
    const result = await pool.query('SELECT * FROM cargos');
    res.status(200).json(result.rows);
}

async function getCargoById(req, res) {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM cargos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Cargo não encontrado" });
    }

    res.status(200).json(result.rows[0]);
}

// Update
async function updateCargo(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const cargo = await pool.query('SELECT * FROM cargos WHERE id = $1', [id]);

    if (cargo.rows.length === 0) {
        return res.status(404).json({ message: "Cargo não encontrado" });
    }

    const result = await pool.query(`
        UPDATE cargos
        SET
            nome = $1,
            descricao = $2
        WHERE id = $3
        RETURNING *
    `, [nome, descricao, id]);

    res.status(200).json(result.rows[0]);
}

// Delete
async function deleteCargo(req, res) {
    const { id } = req.params;
    const cargo = await pool.query('SELECT * FROM cargos WHERE id = $1', [id]);

    if (cargo.rows.length === 0) {
        return res.status(404).json({ message: "Cargo não encontrado" });
    }

    await pool.query('DELETE FROM cargos WHERE id = $1', [id]);

    res.status(200).json({ message: "Cargo deletado com sucesso" });
}

export {
    getAllCargos,
    getCargoById,
    createCargo,
    updateCargo,
    deleteCargo
};
