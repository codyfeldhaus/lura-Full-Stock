// routes
const express = require('express');
const router = express.Router();
const axios = require('axios');

//  Polygon API key
const polygonApiKey = '5xHHbQylCoepucqudYPs7vjYd9Meaiuq';

// GET /api/stocks
router.get('/', async (req, res) => {
  try {
    //  Fetching real-time symbol data 
    const symbol = 'AAPL';
    const polygonResponse = await axios.get(
      `https://api.polygon.io/v1/last/stocks/${symbol}?apiKey=${polygonApiKey}`
    );

    const stockData = polygonResponse.data;
    res.json(stockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/stocks/:bysymbol
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const polygonResponse = await axios.get(
      `https://api.polygon.io/v1/last/stocks/${symbol}?apiKey=${polygonApiKey}`
    );

    const stockData = polygonResponse.data;
    res.json(stockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
