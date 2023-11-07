// server creating
// Environment
import 'dotenv/config.js';

import Debug from 'debug';
// Modules import
import { createServer } from 'node:http';

import userDocImplementation from './app/services/swagger.js';
import app from './app/index.app.js';

userDocImplementation(app);

const debug = Debug('pepine:httpserver');

// import userDocImplementation from './app/middlewares/swagger.doc.js';

// userDocImplementation(app);

const server = createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => debug(`Server launched on http://localhost:${PORT}`));
