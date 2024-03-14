const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://poc1bidirectional.mangobeach-80aea9ed.eastus.azurecontainerapps.io/oasis/poc1/hello-oasis');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
