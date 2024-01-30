const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static('public'));
app.use('/api/images', express.static(('images')));


const products = require('./data/products');

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Serwer backendowy działa na http://localhost:${PORT}`);
});
