import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

// Carica le credenziali di Webshare dalle variabili d'ambiente
const webshareIp = process.env.WEBSHARE_IP;
const websharePort = process.env.WEBSHARE_PORT;
const webshareUsername = process.env.WEBSHARE_USERNAME;
const websharePassword = process.env.WEBSHARE_PASSWORD;

// Controlla se le variabili sono caricate correttamente all'avvio
if (!webshareIp || !websharePort || !webshareUsername || !websharePassword) {
  console.error("ERRORE CRITICO: Una o più variabili d'ambiente di Webshare non sono definite. Il server non può partire.");
  // Se una variabile manca, il server non si avvierà correttamente, causando un errore 502.
}

const proxyConfig = {
  host: webshareIp,
  port: websharePort,
  auth: {
    username: webshareUsername,
    password: websharePassword,
  },
};

app.get('/getGames', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: "Il parametro userId è richiesto" });
  }
  const url = `https://games.roblox.com/v2/users/${userId}/games?sortOrder=Asc&limit=50`;
  try {
    const response = await axios.get(url, { proxy: proxyConfig });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Errore nel contattare le API di Roblox tramite il proxy." });
  }
});

app.get('/getGamePasses', async (req, res) => {
  const universeId = req.query.universeId;
  if (!universeId) {
    return res.status(400).json({ error: "Il parametro universeId è richiesto" });
  }
  const url = `https://games.roblox.com/v1/games/${universeId}/game-passes?sortOrder=Asc&limit=100`;
  try {
    const response = await axios.get(url, { proxy: proxyConfig });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Errore nel contattare le API di Roblox tramite il proxy." });
  }
});

app.listen(port, () => {
  console.log(`Proxy in ascolto sulla porta ${port}`);
});
