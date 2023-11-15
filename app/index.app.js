import express from 'express';

import cors from 'cors';
import userDocImplementation from './services/swagger.js';

import router from './routers/index.router.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/static', express.static('public'));

userDocImplementation(app);
app.use(router);

export default app;
