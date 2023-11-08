// server creating
// Environment
import 'dotenv/config.js';
import Debug from 'debug';
// Modules import
import { createServer } from 'node:http';
import app from './app/index.app.js';

const debug = Debug('pepine:httpserver');

const server = createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => debug(`Server launched on http://localhost:${PORT}`));
