
import {
    getAulaByIdModel,
    createAulaModel,
    getAllAulasModel,
    updateAulaModel, 
    deleteAulaModel,
    getFrequenciaAlunosByAulaModel
} from '../models/AulasModels.js';


async function createAula(req, res){
    const {data_aula, oficina_id, horas} = req.body;
    const result = createAulaModel(data_aula, oficina_id, horas);
    res.status(201).json(result.rows[0]);
}


async function getAllAulas(req, res){
    const result = await getAllAulasModel();
    res.status(200).json(result.rows);
}

async function getAulaById(req, res){
    const {id} = req.params;
    const result = await getAulaById(id);

    if (result.rows.lenght === 0){
        return res.status(404).json({message : "Aula não encontrada"});
    }
    res.status(200).json(result.rows[0]);
}

async function updateAula(req, res) {
    const {id} = req.params;
    const {data_aula, oficina_id, horas} = req.body;

    if((await getAulaById(id)).rows.length <= 0){
        return res.status(404).json({message: "Aula não encontrada"});
    }
    const result = updateAulaModel(id, data_aula, oficina_id, horas);

    res.status(200).json(result.rows[0])
}

async function deleteAula(req, res){
    const {id} = req.params;

    if((await getAulaById(id)).result.rows <= 0){
        return res.status(404).json({message: "Aula não encontrada"});
    }

    const result = await deleteAulaModel(id);

    res.status(200).json({message : "Aula deletada com sucesso"})
}

async function getFrequenciaAlunosByAula(req, res) {
    const { id } = req.params;
    const result = await getFrequenciaAlunosByAulaModel(id);
    res.status(200).json(result.rows)
}


export{
    getAllAulas,
    getAulaById,
    createAula,
    updateAula, 
    deleteAula,
    getFrequenciaAlunosByAula
}