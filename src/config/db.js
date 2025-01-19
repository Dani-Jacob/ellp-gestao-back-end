import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();  
const { Pool } = pkg;


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log('Conexão com o PostgreSQL estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err.stack));

export default pool;
