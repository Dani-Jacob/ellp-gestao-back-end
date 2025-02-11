import pool from "../config/db.js";

import {
    getAllDepartamentosModel,
    getDepartamentoByIdModel,
    createDepartamentoModel,
    updateDepartamentoModel,
    deleteDepartamentoModel,
    getDepartamentoByNomeModel
} from '../models/DepartamentosModels.js'

// Create
async function createDepartamento(req, res) {
    const { nome } = req.body;


    if ((await getDepartamentoByNomeModel(nome)).rows.length > 0) {
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
    const result = await getAllDepartamentosModel();
    res.status(200).json(result.rows);
}

async function getDepartamentoById(req, res) {
    const { id } = req.params;
    const result = await getDepartamentoByIdModel(id);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Departamento não encontrado" });
    }

    res.status(200).json(result.rows[0]);
}

// Update
async function updateDepartamento(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    if ((await getDepartamentoByNomeModel(nome)).rows.length === 0) {
        return res.status(404).json({ message: "Departamento não encontrado" });
    }

    const result = await updateDepartamentoModel(id,nome);

    res.status(200).json(result.rows[0]);
}

// Delete
async function deleteDepartamento(req, res) {
    const { id } = req.params;

    if ((await getDepartamentoByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: "Departamento não encontrado" });
    }

    const result = await deleteDepartamentoModel(id);

    res.status(200).json({ message: "Departamento deletado com sucesso" });
}

export {
    getAllDepartamentos,
    getDepartamentoById,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento
};
