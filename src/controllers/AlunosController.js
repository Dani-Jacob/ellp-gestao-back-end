import pool from '../config/db.js';

//Create
function createAluno(aluno){};

//Read
const getAllAlunos = async (req, res) =>{
    const result = await pool.query('SELECT * FROM alunos');
    res.status(200).json(result.rows);
};

function getAlunoById(id){};

//Update
function updateAluno(aluno){};

//Delete
function deleteAluno(id){};

export {
    getAllAlunos
}