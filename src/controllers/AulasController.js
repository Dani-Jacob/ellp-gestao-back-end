import pool from "../config/db.js";

// create
async function createAula(req, res){
    const {data_aula, oficina_id, horas} = req.body;
    const existingAula = await pool.query('SELECT * FROM aulas WHERE oficina_id = $1 AND data_aula = $2', [oficina_id, data_aula]);

    if(existingAula.rows.length > 0){
        return res.status(400).json({ message: "Já existe uma aula cadastrada nessa data" });
    }
    const result = await pool.query(`
        INSERT INTO aulas (
            data_aula, 
            oficina_id,
            horas
        ) 
        VALUES ($1, $2, $3) 
        RETURNING *
    `, [data_aula, oficina_id, horas]);

    res.status(201).json(result.rows[0]);
}

// read
async function getAllAulas(req, res){
    const result = await pool.query('SELECT * FROM aulas');
    res.status(200).json(result.rows);
}

async function getAulaById(req, res){
    const {id} = req.params;
    const result = await pool.query('SELECT * FROM aulas WHERE id = $1', [id]);

    if (result.rows.lenght === 0){
        return res.status(404).json({message : "Aula não encontrada"});
    }
    res.status(200).json(result.rows[0]);
}

// update

async function updateAula(req, res) {
    const {id} = req.params;
    const {data_aula, oficina_id, horas} = req.body;

    const aula = await pool.query('SELECT * FROM aulas WHERE id = $1', [id])
    if(aula.rows.length === 0){
        return res.status(404).json({message: "Aula não encontrada"});
    }
    const result = await pool.query(`
            UPDATE aulas
            SET
                data_aula = $1,
                oficina_id = $2,
                horas = $3
            WHERE id = $4
            RETURNING *
        `, [data_aula, oficina_id, horas, id]);

    res.status(200).json(result.rows[0])

}

// delete

async function deleteAula(req, res){
    const {id} = req.params;
    const aula = await pool.query('SELECT * FROM aulas WHERE id = $1', [id])

    if(aula.rows.length === 0){
        return res.status(404).json({message: "Aula não encontrada"});
    }
    await pool.query('DELETE FROM aulas WHERE id = $1', [id])

    res.status(200).json({message : "Aula deletada com sucesso"})
}

export{
    getAllAulas,
    getAulaById,
    createAula,
    updateAula, 
    deleteAula
}