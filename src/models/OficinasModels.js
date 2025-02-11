import pool from '../config/db.js';


// create
async function createOficinaModel(nome, ano, periodo, professor, turno, ativo){
    const result = await pool.query(`
        INSERT INTO oficinas (
            nome, 
            ano,
            periodo,
            professor, 
            turno,
            ativo
        ) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
    `, [nome, ano, periodo, professor, turno, ativo]);
    return result;
}



// read
async function getAllOficinasModel() {
    const result = await pool.query('SELECT * FROM oficinas');
    return result;
}

async function getOficinaByIdModel(id) {
    const result = await pool.query('SELECT * FROM oficinas WHERE id = $1', [id]);
    return result;
}

// update
async function updateOficinaModel(id,nome, ano, periodo, professor, turno, ativo){
    const result = await pool.query(`
        UPDATE alunos
        SET 
            nome = $1,
            ano = $2,
            periodo = $3,
            professor = $4,
            turno = $5,
            ativo = $6,
        WHERE id = $7
        RETURNING *
    `, [nome, ano, periodo, professor, turno, ativo,  id]);

    return result;
}

// delete

async function deleteOficinaModel(id) {
    await pool.query('DELETE FROM oficinas WHERE id = $1', [id]);
    console.log(result);
    return result;
}

async function getAulasByOficinaModel(req,res) {
    const result = await pool.query('SELECT * FROM aulas where oficina_id = $1');
    return result;
}

async function getOficinaByNomeModel(nome) {
    const result = await pool.query('SELECT * FROM oficinas WHERE nome = $1', [nome]);
    return result;
}

export{
    createOficinaModel,
    getAllOficinasModel,
    getOficinaByIdModel,
    deleteOficinaModel,
    updateOficinaModel,
    getAulasByOficinaModel,
    getOficinaByNomeModel
}