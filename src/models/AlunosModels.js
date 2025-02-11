import pool from '../config/db.js';

async function getAlunoByCpfModel(cpf) {
    const aluno = await pool.query('SELECT * FROM alunos WHERE cpf = $1', [cpf]);
    return aluno.rows;
}

async function getAlunoByIdModel(id) {
    const aluno = await pool.query('SELECT * FROM alunos WHERE id = $1', [id]);
    return aluno;
}

async function createAlunoModel(nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao) {
    const result = await pool.query(`
            INSERT INTO alunos (
                nome, 
                data_nascimento, 
                ano_escolar, 
                escola, 
                cpf, 
                ativo, 
                necessidades_especiais, 
                endereco, 
                bairro, 
                cep, 
                observacao
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *
        `, [nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao]);

    return result;
}

//Read
async function getAllAlunosModel() {
    const result = await pool.query('SELECT * FROM alunos');
    return result;
};

//Update
async function updateAlunoModel(id, nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao) {
    const result = await pool.query(`
            UPDATE alunos
            SET 
                nome = $1,
                data_nascimento = $2,
                ano_escolar = $3,
                escola = $4,
                cpf = $5,
                ativo = $6,
                necessidades_especiais = $7,
                endereco = $8,
                bairro = $9,
                cep = $10,
                observacao = $11
            WHERE id = $12
            RETURNING *
        `, [nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao, id]);

    return result;
}

//Delete
async function deleteAlunoModel(id) {
    await pool.query('DELETE FROM responsaveis_alunos WHERE aluno_id = $1',[id]);
    await pool.query('DELETE FROM frequencia_alunos_aulas WHERE aluno_id = $1',[id]);
    await pool.query('DELETE FROM alunos WHERE id = $1', [id]);
    return id;
};


async function getResponsaveisByAlunoModel(id) {
    const result = await pool.query(`
            SELECT responsaveis.*
            FROM responsaveis 
            JOIN responsaveis_alunos  ON responsaveis_alunos.responsavel_id = responsaveis.id
            WHERE responsaveis_alunos.aluno_id = $1
        `, [id]);
    return result;
}

async function getRespostasByAlunoModel(id) {
    const result = await pool.query(`
        SELECT 
            r.id, 
            r.aluno_id, 
            r.pergunta_id, 
            r.resposta_texto, 
            r.data_resposta, 
            p.texto
        FROM 
            respostas r
        JOIN 
            perguntas p ON r.pergunta_id = p.id
        WHERE r.aluno_id = $1
        `, [id]);
    return result;
}


async function addAlunoOficinaModel(id, oficina_id) {
    const result = await pool.query('INSERT INTO oficinas_alunos (oficina_id, aluno_id) VALUES($1,$2)', [oficina_id, id]);
    return result;
}

async function addFrequenciaAlunoAulaModel(id, aula_id) {
    const result = await pool.query('INSERT INTO frequencia_alunos_aulas (aluno_id, aula_id) VALUES($1,$2)', [id, aula_id]);

    return result;
}

async function getFrequenciasAulasByAlunoModel(id) {
    const result2 = await pool.query(`
        SELECT 
    al.id AS aluno_id, 
    al.nome AS aluno_nome, 
    a.id AS aula_id, 
    a.data_aula, 
    a.horas, 
    o.nome AS oficina_nome
    FROM aulas a
    JOIN frequencia_alunos_aulas fa ON a.id = fa.aula_id
    JOIN alunos al ON fa.aluno_id = al.id
    JOIN oficinas o ON a.oficina_id = o.id
    WHERE al.id = $1;
        `, [id]);
    return result2;
}

export {
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
}
