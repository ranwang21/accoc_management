const mongoose = require('mongoose')

const ClassroomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  },
  seat: {
    type: Number,
    required: false
  }
})

module.exports = mongoose.model('Classroom', ClassroomSchema)
