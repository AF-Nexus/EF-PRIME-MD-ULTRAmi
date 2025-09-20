import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { EventEmitter } from 'events';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __path = process.cwd();

// Import your pair module (make sure pair.js is also converted to ES modules)
import code from './pair.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Increase max listeners
EventEmitter.defaultMaxListeners = 500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/code', code);

app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html');
});

app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/main.html');
});

app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star ‼️

ᴘᴏᴡᴇʀᴅ ʙʏ ʀᴏᴏᴛ_x

Server running on http://localhost:${PORT}`);
});

export default app;
