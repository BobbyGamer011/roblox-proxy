import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.get('/get-roblox-creations', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Il parametro "userId" è richiesto.' });
  }

  // Nota: Questo endpoint API che stai usando è per gli oggetti del catalogo,
  // non per i "game pass". Se vuoi i game pass, dobbiamo usare gli URL precedenti.
  const robloxApiUrl = `https://catalog.roblox.com/v1/search/items/details?Category=3&Subcategory=12&CreatorTargetId=${userId}&Limit=30&SortOrder=PriceAsc`;
  
  console.log(`Richiesta per userId: ${userId}`);

  try {
    const response = await axios.get(robloxApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Errore durante la chiamata API:", error.message);
    res.status(500).json({ error: 'Impossibile contattare le API di Roblox.' });
  }
});

app.get('/', (req, res) => {
  res.send('Proxy server is running!');
});

app.listen(port, () => {
  console.log(`Proxy server in ascolto sulla porta ${port}`);
});
