import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const api = express();

api.use(express.json());

api.listen(8081, () => console.log('app rodando na porta 8081'));