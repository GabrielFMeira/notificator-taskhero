import express from 'express';

const api = express();

api.listen(8081, () => console.log('app rodando na porta 8081'));