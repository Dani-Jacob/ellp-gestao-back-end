import pool from '../config/db.js';

// create
async function createOficina(req,res){
    const {nome, ano, periodo, professor, turno, ativo} = req.body;
    const existingOficina = await pool.query('SELECT * FROM oficinas WHERE nome = $1', [nome]);

    if (existingOficina.rows.length > 0) {
        return res.status(400).json({ message: "Já existe uma oficina com esse nome." });
    }
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

    res.status(201).json(result.rows[0]);
}



// read
async function getAllOficinas(req,res) {
    const result = await pool.query('SELECT * FROM oficinas');
    res.status(200).json(result.rows);
}

async function getOficinaById(req, res) {
    const {id} = req.params;
    const result = await pool.query('SELECT * FROM oficinas WHERE id = $1', [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Oficina não encontrada." });
    }
    res.status(200).json(result.rows[0]);
}

// update
async function updateOficina(req, res){
    const {id} = req.params;
    const {nome, ano, periodo, professor, turno, ativo} = req.body;

    const oficina = await pool.query('SELECT * FROM oficinas WHERE id = $1', [id]);
    if (oficina.rows.length === 0){
        return res.status(404).json({message: "Oficina não encontrada"})
    }
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

    res.status(200).json(result.rows[0]);
}

// delete

async function deleteOficina(req, res) {
    const {id} = req.params;
    const oficina = await pool.query('SELECT * FROM oficinas WHERE id = $1', [id]);
    if (oficina.rows.length === 0) {
        return res.status(404).json({ message: "Oficina não encontrada." });
    }
    await pool.query('DELETE FROM oficinas WHERE id = $1', [id]);

    res.status(200).json({ message: "Oficina deletada com sucesso." });
}

export{
    createOficina,
    getAllOficinas,
    getOficinaById,
    deleteOficina,
    updateOficina,
    addAlunosOficina
}