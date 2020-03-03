const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

const app = express()

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' })

// MIDDLEWARES
app.use(express.json())
app.use(morgan('dev'))

// MAIN ROUTES
app.get('/', (req, res) => {
  res.send("La Maison d'Aurore API")
})

// CONNECT TO DATABASE
connectDB()

// CONNECT TO SERVER
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT)
})

// HANDLE UNHANDLED PROMISE REJECTIONS
process.on('unhandledRejection', err => {
  console.log('Error:', err.message)
  // CLOSE SERVER & EXIT PROCESS
  server.close(() => process.exit(1))
})
