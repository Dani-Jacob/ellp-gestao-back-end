import pool from '../config/db.js';

import {
    createAtividadeModel,
    getAllAtividadesModel,
    getAtividadeByIdModel,
    updateAtividadeModel,
    deleteAtividadeModel,
    getAtividadeByNomeAndDataModel
} from '../models/AtividadesModels.js';

// Create
async function createAtividade(req, res) {
    const { nome, data_atividade, observacao, horas } = req.body;

    if ((await getAtividadeByNomeAndDataModel(nome,data_atividade)).rows.length > 0) {
        return res.status(400).json({ message: 'Já existe uma atividade com esse nome na mesma data' });
    }

    const result = await createAtividadeModel(nome, data_atividade, observacao, horas);

    res.status(201).json(result.rows[0]);
}

// Read
async function getAllAtividades(req, res) {
    const result = await getAllAtividadesModel();
    res.status(200).json(result.rows);
}

async function getAtividadeById(req, res) {
    const { id } = req.params;
    const result = await getAtividadeByIdModel(id);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
    }
    res.status(200).json(result.rows[0]);
}

// Update
async function updateAtividade(req, res) {
    const { id } = req.params;
    const { nome, data_atividade, observacao, horas } = req.body;

 
    if ((await getAtividadeByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    const result = await updateAtividadeModel(id,nome, data_atividade, observacao, horas)

    res.status(200).json(result.rows[0]);
}

// Delete
async function deleteAtividade(req, res) {
    const { id } = req.params;

    if ((await getAtividadeByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    const result = await deleteAtividadeModel(id);
    res.status(200).json({ message: 'Atividade deletada com sucesso' });
}


export {
    createAtividade,
    getAllAtividades,
    getAtividadeById,
    updateAtividade,
    deleteAtividade
};
