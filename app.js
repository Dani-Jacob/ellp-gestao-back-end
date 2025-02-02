import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();  

import db from './src/config/db.js'; 

//Routes
import alunosRoutes from './src/routes/AlunosRoutes.js';
import authRoutes from './src/routes/AuthRoutes.js';

//Middlewares
import getErrorsMidleware from './src/middlewares/GetErrorsMiddleware.js';


const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));


app.use('/alunos', alunosRoutes);
app.use('/token',authRoutes);


app.use(getErrorsMidleware);

export default app;
