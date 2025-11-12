import express from 'express';
import dotenv from 'dotenv';
// import routes from "./controller/TesteController.js";

dotenv.config();
const api = express();

api.use(express.json());
// api.use(routes);

api.listen(8081, () => console.log('app rodando na porta 8081'));