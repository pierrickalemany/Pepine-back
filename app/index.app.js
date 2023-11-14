import express from 'express';
import cors from 'cors';
import userDocImplementation from './services/swagger.js';

import router from './routers/index.router.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('docs'));

app.use(express.urlencoded({
  extended: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

userDocImplementation(app);
app.use(router);

export default app;
