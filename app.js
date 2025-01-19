import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();  

import db from './src/config/db.js'; 

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

export default app;
