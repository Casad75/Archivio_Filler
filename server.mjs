import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'casad',
    database: 'anime',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        process.exit(1);
    }
    console.log('Database connesso!');
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
}));

const activeSessions = new Map();

app.use((req, res, next) => {
    const sessionId = req.session.id;
    if (!activeSessions.has(sessionId)) {
        activeSessions.set(sessionId, { created: new Date(), data: req.session });
    }
    req.session.lastAccess = new Date();
    next();
});

app.get('/active-sessions', (req, res) => {
    const sessions = [];
    activeSessions.forEach((value, key) => {
        sessions.push({ id: key, ...value });
    });
    res.json(sessions);
});

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/:anime', (req, res, next) => {
    const animeName = req.params.anime;
    console.log(`Richiesta per: ${animeName}`);
    const episodesQuery = `SELECT * FROM ??`;
    db.query(episodesQuery, [animeName], (err, episodes) => {
        if (err) {
            console.error('Errore nella query:', err);
            return next(err);
        }
        res.json(episodes);
    });
});

app.get('/mal-episode/:anime/:episode', async (req, res, next) => {
    const episodeId = icon.closest('tr').querySelector('td:first-child').textContent;
    const animeName = document.getElementById('animeName').getAttribute('data-animeName');

    if (!animeName) {
        return res.status(400).send('Nome anime non valido.');
    }

    try {
        const streamingUrl = await scrapeEpisodeStreamingUrl(animeName, episodeId);
        res.json({ url: streamingUrl });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error('Errore nel server:', err.stack);
    res.status(500).send('Qualcosa è andato storto! Il nostro team sta lavorando per risolverlo.');
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});

server.setTimeout(300000);
