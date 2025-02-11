import pool from '../config/db.js';
import argon2 from 'argon2';

import {
    getVoluntarioByIdModel,
    getVoluntarioByCpfModel,
    getVoluntarioByEmailModel,
    createVoluntarioModel,
    getAllVoluntariosModel,
    updateVoluntarioModel,
    deleteVoluntarioModel,
    addFrequenciaVoluntarioAtividadeModel,
    addFrequenciaVoluntarioAulaModel
} from '../models/VoluntariosModels.js';

async function createVoluntario(req, res) {
    const { nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento } = req.body;

    if ((await getVoluntarioByCpfModel(cpf)).rows.length > 0) {
        return res.status(400).json({ message: "Já existe um voluntário com esse CPF." });
    }

    if ((await getVoluntarioByEmailModel(email)).rows.length > 0) {
        return res.status(400).json({ message: "Já existe um voluntário com esse e-mail." });
    }

    const existingCargo = await pool.query('SELECT * FROM cargos WHERE id = $1',[cargo_id]);
    if (existingCargo.rows.length <= 0) {
        return res.status(400).json({ message: "Cargo não existe." });
    }

    const existingDepartamento = await pool.query('SELECT * FROM departamentos WHERE id = $1',[id_departamento]);
    if (existingDepartamento.rows.length <= 0) {
        return res.status(400).json({ message: "Departamento não existe." });
    }

    const hashedPassword = await argon2.hash(senha, { type: argon2.argon2id });

    const result = await createVoluntarioModel(nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, hashedPassword, cargo_id, id_departamento);

    res.status(201).json(result.rows[0]);
}

async function getAllVoluntarios(req, res) {
    const result = await getAllVoluntariosModel();
    res.status(200).json(result.rows);
}

async function getVoluntarioById(req, res) {
    const { id } = req.params;
    const result = await getVoluntarioByIdModel(id);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    res.status(200).json(result.rows[0]);
}

async function updateVoluntario(req, res) {
    const { id } = req.params;
    const { nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento } = req.body;

    if ((await getVoluntarioById(id)).rows.length === 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    const result = await updateVoluntarioModel(id, nome, ra, telefone, cpf, email, curso, ativo, endereco, bairro, cep, senha, cargo_id, id_departamento, id);

    res.status(200).json(result.rows[0]);
}

async function deleteVoluntario(req, res) {
    const { id } = req.params;

    if ((await getVoluntarioByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    await deleteVoluntarioModel(id);

    res.status(200).json({ message: "Voluntário deletado com sucesso." });
}

async function addFrequenciaVoluntarioAtividade(req, res) {
    const { id, id_atividade } = req.params;

    if ((await getVoluntarioById(id)).rows.length == 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    const atividade = await pool.query('SELECT * FROM atividade WHERE id = $1', [id_atividade]);
    if (atividade.rows.length === 0) {
        return res.status(404).json({ message: "Atividade não encontrada." });
    }

    const rs = await addFrequenciaVoluntarioAtividadeModel(id, id_atividade);
        	
    res.status(201).json({ message: "Frequência registrada com sucesso!"});
}

async function addFrequenciaVoluntarioAula(req, res) {
    const { id, id_aula } = req.params;

    if ((await getVoluntarioById(id)).rows.length == 0) {
        return res.status(404).json({ message: "Voluntário não encontrado." });
    }

    const atividade = await pool.query('SELECT * FROM aula WHERE id = $1', [id_aula]);
    if (atividade.rows.length === 0) {
        return res.status(404).json({ message: "Aula não encontrada." });
    }

    const rs = await addFrequenciaVoluntarioAulaModel(id, id_aula);
        	
    res.status(201).json({ message: "Frequência registrada com sucesso!"});
}

export {
    createVoluntario,
    getVoluntarioById,
    updateVoluntario,
    deleteVoluntario,
    getAllVoluntarios,
    addFrequenciaVoluntarioAtividade,
    addFrequenciaVoluntarioAula
};
