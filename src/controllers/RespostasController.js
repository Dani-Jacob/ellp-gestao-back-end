
import {
    postRespostaByAlunoModel,
    getAllRespostasModel
} from '../models/RespostasModels.js';

async function getAllRespostas(req, res) {
    const result = await getAllRespostasModel();
    res.status(200).json(result.rows); 
}

async function postRespostaByAluno(req,res) {
    const {aluno_id, pergunta_id,resposta_texto} = req.body;
    const result = await postRespostaByAlunoModel(aluno_id,pergunta_id,resposta_texto);
    res.status(201).json(result.rows); 
}

export {
    getAllRespostas,
    postRespostaByAluno
};