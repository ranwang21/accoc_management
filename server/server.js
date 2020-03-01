const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' })

app.use(bodyParser.json())

// MAIN ROUTES
app.get('/', (req, res) => {
  res.send("La Maison d'Aurore API")
})

// CONNECT TO SERVER
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT)
})
