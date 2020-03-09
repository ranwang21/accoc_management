const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const errorHandler = require('./middlewares/error')
const connectDB = require('./configs/db')

const app = express()

// LOAD ENV VARS
dotenv.config({ path: './configs/config.env' })

// MIDDLEWARES
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public'))

// ROUTE FILES
const roles = require('./routes/roles')
const classrooms = require('./routes/classrooms')
const days = require('./routes/days')
const classroomSchedules = require('./routes/classroomSchedules')

// MOUNT ROUTERS
app.use('/roles', roles)
app.use('/classrooms', classrooms)
app.use('/days', days)
app.use('/classroom-schedules', classroomSchedules)

// MAIN ROUTE
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

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
