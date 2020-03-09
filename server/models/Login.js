const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: 'User'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  is_active: Boolean,
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

module.exports = mongoose.model('Login', LoginSchema)
