import pool from "../config/db.js";

// Create
async function createDepartamento(req, res) {
    const { nome } = req.body;

    const existingDepartamento = await pool.query('SELECT * FROM departamentos WHERE nome = $1', [nome]);

    if (existingDepartamento.rows.length > 0) {
        return res.status(400).json({ message: "Já existe um departamento com esse nome" });
    }

    const result = await pool.query(`
        INSERT INTO departamentos (
            nome
        ) 
        VALUES ($1) 
        RETURNING *
    `, [nome]);

    res.status(201).json(result.rows[0]);
}

// Read
async function getAllDepartamentos(req, res) {
    const result = await pool.query('SELECT * FROM departamentos');
    res.status(200).json(result.rows);
}

async function getDepartamentoById(req, res) {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM departamentos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Departamento não encontrado" });
    }

    res.status(200).json(result.rows[0]);
}

// Update
async function updateDepartamento(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    const departamento = await pool.query('SELECT * FROM departamentos WHERE id = $1', [id]);

    if (departamento.rows.length === 0) {
        return res.status(404).json({ message: "Departamento não encontrado" });
    }

    const result = await pool.query(`
        UPDATE departamentos
        SET
            nome = $1
        WHERE id = $2
        RETURNING *
    `, [nome, id]);

    res.status(200).json(result.rows[0]);
}

// Delete
async function deleteDepartamento(req, res) {
    const { id } = req.params;
    const departamento = await pool.query('SELECT * FROM departamentos WHERE id = $1', [id]);

    if (departamento.rows.length === 0) {
        return res.status(404).json({ message: "Departamento não encontrado" });
    }

    await pool.query('DELETE FROM departamentos WHERE id = $1', [id]);

    res.status(200).json({ message: "Departamento deletado com sucesso" });
}

export {
    getAllDepartamentos,
    getDepartamentoById,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento
};
