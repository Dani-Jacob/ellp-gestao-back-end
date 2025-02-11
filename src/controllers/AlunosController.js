import pool from '../config/db.js';

import {
    getAlunoByCpfModel, 
    getAlunoByIdModel, 
    createAlunoModel, 
    getAllAlunosModel, 
    updateAlunoModel, 
    deleteAlunoModel, 
    getResponsaveisByAlunoModel, 
    getRespostasByAlunoModel, 
    addAlunoOficinaModel,
    addFrequenciaAlunoAulaModel,
    getFrequenciasAulasByAlunoModel
} from '../models/AlunosModels.js';

async function createAluno(req, res) { //OK
    const { nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao } = req.body;

    //Verifica se existe um aluno com esse cpf
    if((await getAlunoByCpfModel(cpf)).length > 0) {
        return res.status(400).json({ message: "Já existe um aluno com esse CPF." });
    };

    //Cria o aluno
    let result = await createAlunoModel(nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao);

    res.status(201).json(result.rows[0]);
}

async function getAllAlunos(req, res) { //OK
    const result = await getAllAlunosModel();
    res.status(200).json(result.rows);
};

async function getAlunoById(req, res) { //OK
    const { id } = req.params;
    let result = await getAlunoByIdModel(id);
    if (result.rows.length == 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }
    res.status(200).json(result.rows[0]);
}

async function updateAluno(req, res) {//OK
    const { id } = req.params;
    const { nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao } = req.body;

    if (await getAlunoByIdModel(id) === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }

    const result = await updateAlunoModel(id,nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao);
    res.status(200).json(result.rows[0]);
}

async function deleteAluno(req, res) { //OK
    const { id } = req.params;
    if ((await getAlunoByIdModel(id)).rows.length == 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }
    const result = await deleteAlunoModel(id);

    return res.status(200).json({ message: "Aluno deletado com sucesso." });
};

async function getResponsaveisByAluno(req, res) { //OK
    const { id } = req.params;
    if ((await getAlunoByIdModel(id)).rows.length == 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }
    const result = await getResponsaveisByAlunoModel(id);
    res.status(200).json(result.rows);
}

async function getRespostasByAluno(req, res) { //OK
    const { id } = req.params;
    if ((await getAlunoByIdModel(id)).rows.length == 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }
    const result = await getRespostasByAlunoModel(id);
    res.status(200).json(result.rows);
}

async function addAlunoOficina(req, res) { //Falta model de oficina
    const { id, oficina_id } = req.params;
    
    if (getAlunoByIdModel(id).length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }

    const result2 = await pool.query('SELECT * FROM oficinas WHERE id = $1', [oficina_id]);
    if (result2.rows.length === 0) {
        return res.status(404).json({ message: "Oficina não encontrada." });
    }

    const result3 = await addAlunoOficinaModel(id, oficina_id);

    res.status(201).json({"message": "Aluno adicionado na oficina com sucesso!"});
}

async function addFrequenciaAlunoAula(req, res) { // Falta model de aulas
    const { id, aula_id } = req.params;
    
    if ((await getAlunoByIdModel(id)).rows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }

    const result2 = await pool.query('SELECT * FROM aulas WHERE id = $1', [aula_id]);
    if (result2.rows.length === 0) {
        return res.status(404).json({ message: "Oficina não encontrada." });
    }

    const result3 = await addFrequenciaAlunoAulaModel(id, aula_id)

    res.status(201).json({"message": "Aluno adicionado na aula com sucesso!"});
}

async function getFrequenciasAulasByAluno(req, res) {
    const { id } = req.params;
    
    if ((await getAlunoByIdModel(id)).rows.length == 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }

    const result2 = await getFrequenciasAulasByAlunoModel(id);
    res.status(200).json(result2.rows);
}


export {
    getAllAlunos,
    getAlunoById,
    updateAluno,
    deleteAluno,
    createAluno,
    getResponsaveisByAluno,
    getRespostasByAluno,
    addAlunoOficina,
    addFrequenciaAlunoAula,
    getFrequenciasAulasByAluno
}