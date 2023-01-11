import express from 'express';

import router from './router';

const app = express();

require('dotenv').config();
app.use(express.json());
app.use('/', router);

module.exports = app;
