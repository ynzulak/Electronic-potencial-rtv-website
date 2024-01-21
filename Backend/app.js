const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3000

app.use(cors())

app.use('/api/images', express.static(path.join(__dirname, 'images')))

const products = require('./data/products')

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.listen(port, () => {
	console.log(`Serwer backendowy działa na http://localhost:${port}`)
})
