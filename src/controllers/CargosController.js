import pool from "../config/db.js";

import {
    getAllCargosModel,
    getCargoByIdModel,
    createCargoModel,
    updateCargoModel,
    deleteCargoModel,
    getCargoByNomeModel
} from '../models/CargosModels.js';

// Create
async function createCargo(req, res) {
    const { nome, descricao } = req.body;

    if ((await getCargoByNomeModel(nome)).rows.length > 0) {
        return res.status(400).json({ message: "Já existe um cargo com esse nome" });
    }

    const result = await createCargoModel(nome, descricao);

    res.status(201).json(result.rows[0]);
}

// Read
async function getAllCargos(req, res) {
    const result = await getAllCargosModel();
    res.status(200).json(result.rows);
}

async function getCargoById(req, res) {
    const { id } = req.params;
    const result = await getCargoByIdModel(id);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Cargo não encontrado" });
    }

    res.status(200).json(result.rows[0]);
}

// Update
async function updateCargo(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if ((await getCargoByNomeModel(nome)).rows.length > 0) {
        return res.status(400).json({ message: "Já existe um cargo com esse nome" });
    }

    const result = await updateCargoModel(id, nome, descricao);

    res.status(200).json(result.rows[0]);
}

// Delete
async function deleteCargo(req, res) {
    const { id } = req.params;
    const cargo = await pool.query('SELECT * FROM cargos WHERE id = $1', [id]);

    if ((await getCargoByNomeModel(nome)).rows.length > 0) {
        return res.status(400).json({ message: "Já existe um cargo com esse nome" });
    }

    const result = deleteCargoModel(id);

    res.status(200).json({ message: "Cargo deletado com sucesso" });
}

export {
    getAllCargos,
    getCargoById,
    createCargo,
    updateCargo,
    deleteCargo
};
