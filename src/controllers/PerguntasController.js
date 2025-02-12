
import {getAllPerguntasModel} from '../models/PerguntasModels.js';

async function getAllPerguntas(req, res) {
    const result = await getAllPerguntasModel();
    res.status(200).json(result.rows); 
}



export{
    getAllPerguntas
}