import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/live-matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.cricapi.com/v1/currentMatches', {
      params: {
        apikey: process.env.CRIC_API_KEY,
        offset: 0,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch live match data' });
  }
});

app.get('/api/match-score/:id', async (req, res) => {
  const matchId = req.params.id;
  try {
    const response = await axios.get('https://api.cricapi.com/v1/match_scorecard', {
      params: {
        apikey: process.env.CRIC_API_KEY,
        id: matchId,
        offset: 0,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match score' });
  }
});

app.get('/api/match-commentary/:id', async (req, res) => {
  const matchId = req.params.id;
  try {
    const response = await axios.get('https://api.cricapi.com/v1/match_commentary', {
      params: {
        apikey: process.env.CRIC_API_KEY,
        id: matchId,
        offset: 0,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch commentary' });
  }
});

app.get('/api/match-players/:id', async (req, res) => {
  const matchId = req.params.id;
  try {
    const response = await axios.get('https://api.cricapi.com/v1/match_squad', {
      params: {
        apikey: process.env.CRIC_API_KEY,
        id: matchId,
        offset: 0,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match squad' });
  }
});

app.get('/api/player/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get('https://api.cricapi.com/v1/players', {
      params: {
        apikey: process.env.CRIC_API_KEY,
        search: name,
        offset: 0,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search player' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
