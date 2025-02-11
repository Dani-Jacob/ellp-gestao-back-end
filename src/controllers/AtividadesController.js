import pool from '../config/db.js';

// Create
async function createAtividade(req, res) {
    const { nome, data_atividade, observacao, horas } = req.body;

    // Verifica se já existe uma atividade para a mesma data
    const existingAtividade = await pool.query(
        'SELECT * FROM atividades WHERE data_atividade = $1 AND nome = $2',
        [data_atividade, nome]
    );

    if (existingAtividade.rows.length > 0) {
        return res.status(400).json({ message: 'Já existe uma atividade com esse nome na mesma data' });
    }

    const result = await pool.query(
        `
        INSERT INTO atividades (
            nome,
            data_atividade,
            observacao,
            horas
        ) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
        `,
        [nome, data_atividade, observacao, horas]
    );

    res.status(201).json(result.rows[0]);
}

// Read
async function getAllAtividades(req, res) {
    const result = await pool.query('SELECT * FROM atividades');
    res.status(200).json(result.rows);
}

async function getAtividadeById(req, res) {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM atividades WHERE id = $1', [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
    }
    res.status(200).json(result.rows[0]);
}

// Update
async function updateAtividade(req, res) {
    const { id } = req.params;
    const { nome, data_atividade, observacao, horas } = req.body;

    const atividade = await pool.query('SELECT * FROM atividades WHERE id = $1', [id]);
    if (atividade.rows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    const result = await pool.query(
        `
        UPDATE atividades
        SET
            nome = $1,
            data_atividade = $2,
            observacao = $3,
            horas = $4
        WHERE id = $5
        RETURNING *
        `,
        [nome, data_atividade, observacao, horas, id]
    );

    res.status(200).json(result.rows[0]);
}

// Delete
async function deleteAtividade(req, res) {
    const { id } = req.params;

    const atividade = await pool.query('SELECT * FROM atividades WHERE id = $1', [id]);
    if (atividade.rows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    await pool.query('DELETE FROM atividades WHERE id = $1', [id]);
    res.status(200).json({ message: 'Atividade deletada com sucesso' });
}

async function updateFrequenciasAtividade(req, res) {
    const { id } = req.params;
    const { voluntarios_id } = req.body;

    const atividade = await pool.query('SELECT * FROM atividades WHERE id = $1', [id]);
    if (atividade.rows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    for (let voluntario_id of voluntarios_id) {
        const voluntario = await pool.query('SELECT * FROM voluntarios WHERE id = $1', [voluntario_id]);
        if (voluntario.rows.length === 0) {
            return res.status(404).json({ message: 'Voluntário ' + voluntario_id +' não encontrado' });
        }
    }

    for (let voluntario_id of voluntarios_id) {
        await pool.query(`
                INSERT INTO frequencia_voluntarios_atividades (voluntario_id, atividade_id) 
                VALUES ($1, $2) 
            `, [voluntario_id, id]);
    }
    return res.status(201).json({ message: "Frequência de voluntários registrada com sucesso à atividade." });

}


export {
    createAtividade,
    getAllAtividades,
    getAtividadeById,
    updateAtividade,
    deleteAtividade,
    updateFrequenciasAtividade
};
