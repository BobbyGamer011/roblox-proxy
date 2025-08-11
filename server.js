const express = require('express');
const axios = require('axios');
const app = express();

app.get('/get-roblox-creations', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Il parametro "userId" è richiesto.' });
  }
  const robloxApiUrl = `https://catalog.roblox.com/v1/search/items/details?Category=3&Subcategory=12&CreatorTargetId=${userId}&Limit=30&SortOrder=PriceAsc`;
  console.log(`Richiesta per userId: ${userId}`);
  try {
    const response = await axios.get(robloxApiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Impossibile contattare le API di Roblox.' });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy server is running!');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy server in ascolto sulla porta ' + listener.address().port);
});
