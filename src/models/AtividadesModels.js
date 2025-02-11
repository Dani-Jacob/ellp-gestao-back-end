import pool from '../config/db.js';



async function getAtividadeByNomeAndDataModel(nome,data) {
    const result = await pool.query(
        'SELECT * FROM atividades WHERE data_atividade = $1 AND nome = $2',
        [data_atividade, nome]
    );
    return result;
}
// Create
async function createAtividadeModel(nome, data_atividade, observacao, horas ) {
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

    return result;
}

// Read
async function getAllAtividadesModel() {
    const result = await pool.query('SELECT * FROM atividades');
    return result;
}

async function getAtividadeByIdModel(id) {
    const result = await pool.query('SELECT * FROM atividades WHERE id = $1', [id]);
    return result;
}

// Update
async function updateAtividadeModel(id,nome, data_atividade, observacao, horas) {

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

    return result;
}

// Delete
async function deleteAtividadeModel(id) {
    const result = await pool.query('DELETE FROM atividades WHERE id = $1', [id]);
    return result;
}


export {
    createAtividadeModel,
    getAllAtividadesModel,
    getAtividadeByIdModel,
    updateAtividadeModel,
    deleteAtividadeModel,
    getAtividadeByNomeAndDataModel
};
