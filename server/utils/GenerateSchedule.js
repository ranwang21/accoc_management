const User = require('../models/User')

const generateSchedule = async (req, res) => {
  const users = User.find()
}

module.exports = generateSchedule
