import pool from '../config/db.js';

import {
    createResponsavelModel,
    getResponsavelByIdModel,
    updateResponsavelModel,
    deleteResponsavelModel,
    getAllResponsaveisModel,
    getResponsavelByCpfModel
} from '../models/ResponsaveisModels.js';

async function createResponsavel(req, res) {
    const { nome, telefone, cpf, email, tipo_parentesco, id_aluno } = req.body;
    if ((await getResponsavelByCpfModel(cpf)).rows.length > 0) {
        return res.status(400).json({ message: "Já existe um responsável com esse CPF." });
    }
    const result = await createResponsavelModel( nome, telefone, cpf, email, tipo_parentesco, id_aluno)
    res.status(201).json(result.rows[0]); 
}

async function getAllResponsaveis(req, res) {
    const result = await getAllResponsaveisModel();
    res.status(200).json(result.rows); 
}

async function getResponsavelById(req, res) {
    const { id } = req.params;
    if ((await getResponsavelByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: "Responsável não encontrado." });
    }
    res.status(200).json(result.rows[0]); 
}

async function updateResponsavel(req, res) {
    const { id } = req.params;
    const { nome, telefone, cpf, email, tipo_parentesco } = req.body;
    if ((await getResponsavelByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: "Responsável não encontrado." });
    }
    const result = await updateResponsavelModel(id,nome, telefone, cpf, email, tipo_parentesco);
    res.status(200).json(result.rows[0]);
}

async function deleteResponsavel(req, res) {
    const { id } = req.params;
    if ((await getResponsavelByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: "Responsável não encontrado." });
    }
    const result = await deleteResponsavelModel(id);
    res.status(200).json({ message: "Responsável deletado com sucesso." });
}


export{
    createResponsavel,
    getResponsavelById,
    updateResponsavel,
    deleteResponsavel,
    getAllResponsaveis
}