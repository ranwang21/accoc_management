const fs = require('fs')
const mongoose = require('mongoose')

// LOAD MODELS
const Role = require('./models/Role')
const Day = require('./models/Day')
const Classroom = require('./models/Classroom')

// CONNECT TO DB
mongoose.connect(
  'mongodb+srv://admin:abc123...@cluster-pdbxc.mongodb.net/Database?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
)

// READ JSON FILES
const roles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/roles.json`, 'utf-8')
)
const days = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/days.json`, 'utf-8')
)
const classrooms = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/classrooms.json`, 'utf-8')
)

// IMPORT INTO DB
const importData = async () => {
  try {
    await Role.create(roles)
    await Day.create(days)
    await Classroom.create(classrooms)
    console.log('Data Imported...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// DELETE DATA
const deleteData = async () => {
  try {
    await Role.deleteMany()
    await Day.deleteMany()
    await Classroom.deleteMany()
    console.log('Data Destroyed...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// CALL FUNCTION ON TERMINAL
if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
