import pool from '../config/db.js';

//Create
async function createAluno(req, res) {
    const { nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao } = req.body;
    const existingAluno = await pool.query('SELECT * FROM alunos WHERE cpf = $1', [cpf]);

    if (existingAluno.rows.length > 0) {
        return res.status(400).json({ message: "Já existe um aluno com esse CPF." });
    }
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

    res.status(201).json(result.rows[0]);
}

//Read
async function getAllAlunos(req, res) {
    const result = await pool.query('SELECT * FROM alunos');
    res.status(200).json(result.rows);
};

async function getAlunoById(req, res) {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM alunos WHERE ID = $1', [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }
    res.status(200).json(result.rows[0]);
}

//Update
async function updateAluno(req, res) {
    const { id } = req.params;
    const { nome, data_nascimento, ano_escolar, escola, cpf, ativo, necessidades_especiais, endereco, bairro, cep, observacao } = req.body;

    const aluno = await pool.query('SELECT * FROM alunos WHERE id = $1', [id]);
    if (aluno.rows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }
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

    res.status(200).json(result.rows[0]);
}

//Delete
async function deleteAluno(req, res) {
    const { id } = req.params;
    const aluno = await pool.query('SELECT * FROM alunos WHERE id = $1', [id]);
    if (aluno.rows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }
    await pool.query('DELETE FROM alunos WHERE id = $1', [id]);

    res.status(200).json({ message: "Aluno deletado com sucesso." });
};


async function getResponsaveisByAluno(req, res) {
    const { id } = req.params;
    const result = await pool.query(`
            SELECT responsaveis.*
            FROM responsaveis 
            JOIN responsaveis_alunos  ON responsaveis_alunos.responsavel_id = responsaveis.id
            WHERE responsaveis_alunos.aluno_id = $1
        `, [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Nenhum responsável encontrado para este aluno." });
    }
    res.status(200).json(result.rows);
}

async function getRespostasByAluno(req, res) {
    const { id } = req.params;
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
        WHERE r.aluno_id = 1
        `, [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Nenhuma resposta encontrada para este aluno." });
    }
    res.status(200).json(result.rows);
}



async function addAlunoOficina(req, res) {
    const { id, oficina_id } = req.params;
    
    const result = await pool.query('SELECT * FROM alunos WHERE ID = $1', [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }

    const result2 = await pool.query('SELECT * FROM oficinas WHERE id = $1', [oficina_id]);
    if (result2.rows.length === 0) {
        return res.status(404).json({ message: "Oficina não encontrada." });
    }

    const result3 = await pool.query('INSERT INTO oficinas_alunos (oficina_id, aluno_id) VALUES($1,$2)', [oficina_id,id]);

    res.status(201).json({"message": "Aluno adicionado na oficina com sucesso!"});
}

async function addFrequenciaAlunoAula(req, res) {
    const { id, aula_id } = req.params;
    
    const result = await pool.query('SELECT * FROM alunos WHERE ID = $1', [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }

    const result2 = await pool.query('SELECT * FROM aulas WHERE id = $1', [aula_id]);
    if (result2.rows.length === 0) {
        return res.status(404).json({ message: "Oficina não encontrada." });
    }

    const result3 = await pool.query('INSERT INTO frequencia_alunos_aulas (aluno_id, aula_id) VALUES($1,$2)', [id, aula_id]);

    res.status(201).json({"message": "Aluno adicionado na aula com sucesso!"});
}



export {
    getAllAlunos,
    getAlunoById,
    updateAluno,
    deleteAluno,
    createAluno,
    getResponsaveisByAluno,
    getRespostasByAluno,
    addAlunoOficina,
    addFrequenciaAlunoAula
}