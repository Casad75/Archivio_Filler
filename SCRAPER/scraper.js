// Importa la libreria Cheerio
const cheerio = require('cheerio');
const fetch = require('node-fetch');
import { scrapeEpisodeStreamingUrl } from './scraper.js';

// Funzione per ottenere l'URL di streaming da un sito web di anime
async function scrapeEpisodeStreamingUrl(animeName, episodeId) {
    const response = await fetch(`https://www.animesaturn.bz/ep/${animeName}-ep-${episodeId}`);
    if (!response.ok) {
        throw new Error('Errore nella richiesta a MyAnimeList');
    }

    const html = await response.text();
    const $ = cheerio.load(html); // Carica il documento HTML utilizzando Cheerio

    // Utilizza Cheerio per selezionare gli elementi HTML
    const streamingUrl = $('.streaming-url').attr('href'); // Modifica questa riga

    return streamingUrl;
}

module.exports = { scrapeEpisodeStreamingUrl };
