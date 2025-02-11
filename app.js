import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();  

import db from './src/config/db.js'; 

//Routes
import alunosRoutes from './src/routes/AlunosRoutes.js';
import authRoutes from './src/routes/AuthRoutes.js';
import responsaveisRoutes from './src/routes/ResponsaveisRoutes.js';
import voluntariosRoutes from './src/routes/VoluntariosRoutes.js';
import oficinasRoutes from './src/routes/OficinasRoutes.js';
import aulasRoutes from './src/routes/AulasRoutes.js';
import cargosRoutes from './src/routes/CargosRoutes.js';
import departamentosRoutes from './src/routes/DepartamentosRoutes.js';

//Middlewares
import getErrorsMidleware from './src/middlewares/GetErrorsMiddleware.js';


const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

//TOKEN
app.use('/token',authRoutes);

app.use('/alunos', alunosRoutes);
app.use('/responsaveis', responsaveisRoutes);
app.use('/voluntarios', voluntariosRoutes);
app.use('/oficinas', oficinasRoutes);
app.use('/aulas', aulasRoutes);
app.use('/cargos', cargosRoutes);
app.use('/departamentos', departamentosRoutes);



app.use(getErrorsMidleware);

export default app;
