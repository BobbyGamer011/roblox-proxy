const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

// Carica le credenziali di Webshare dalle variabili d'ambiente
const webshareIp = process.env.WEBSHARE_IP;
const websharePort = process.env.WEBSHARE_PORT;
const webshareUsername = process.env.WEBSHARE_USERNAME;
const websharePassword = process.env.WEBSHARE_PASSWORD;

const proxyConfig = {
  host: webshareIp,
  port: websharePort,
  auth: {
    username: webshareUsername,
    password: websharePassword,
  },
};

app.get("/getGames", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "userId richiesto" });
  const url = `https://games.roblox.com/v2/users/${userId}/games?sortOrder=Asc&limit=50`;
  try {
    const response = await axios.get(url, { proxy: proxyConfig });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Errore nel contattare le API di Roblox via proxy." });
  }
});

app.get("/getGamePasses", async (req, res) => {
    const universeId = req.query.universeId;
    if (!universeId) return res.status(400).json({ error: "universeId richiesto" });
    const url = `https://games.roblox.com/v1/games/${universeId}/game-passes?sortOrder=Asc&limit=100`;
    try {
        const response = await axios.get(url, { proxy: proxyConfig });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Errore nel contattare le API di Roblox via proxy." });
    }
});

app.listen(port, () => {
  console.log(`Proxy in ascolto sulla porta ${port}`);
});
