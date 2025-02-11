import pool from '../config/db.js';

import {
    createOficinaModel,
    getAllOficinasModel,
    getOficinaByIdModel,
    deleteOficinaModel,
    updateOficinaModel,
    getAulasByOficinaModel,
    getOficinaByNomeModel
} from '../models/OficinasModels.js';

// create
async function createOficina(req,res){
    const {nome, ano, periodo, professor, turno, ativo} = req.body;

    if ((await getOficinaByNomeModel(nome)).rows.length > 0) {
        return res.status(400).json({ message: "Já existe uma oficina com esse nome." });
    }
    const result = await createOficinaModel(nome, ano, periodo, professor, turno, ativo)

    res.status(201).json(result.rows[0]);
}



// read
async function getAllOficinas(req,res) {
    const result = await getAllOficinasModel();
    res.status(200).json(result.rows);
}

async function getOficinaById(req, res) {
    const {id} = req.params;
    const result = await getOficinaByIdModel(id);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Oficina não encontrada." });
    }
    res.status(200).json(result.rows[0]);
}

// update
async function updateOficina(req, res){
    const {id} = req.params;
    const {nome, ano, periodo, professor, turno, ativo} = req.body;

    if ((await getOficinaByIdModel(id)).rows.length === 0){
        return res.status(404).json({message: "Oficina não encontrada"})
    }
    const result = await updateOficinaModel(id,nome, ano, periodo, professor, turno, ativo);

    res.status(200).json(result.rows[0]);
}

// delete

async function deleteOficina(req, res) {
    const {id} = req.params;

    if ((await getOficinaByIdModel(id)).rows.length === 0){
        return res.status(404).json({message: "Oficina não encontrada"})
    }

    const result = await deleteOficinaModel(id);

    res.status(200).json({ message: "Oficina deletada com sucesso." });
}

async function getAulasByOficina(req,res) {
    const result = await getAulasByOficinaModel(id);
    res.status(200).json(result.rows);
}

export{
    createOficina,
    getAllOficinas,
    getOficinaById,
    deleteOficina,
    updateOficina,
    getAulasByOficina
}