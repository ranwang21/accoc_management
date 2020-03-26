const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Schedule = require('../models/Schedule')
const generateSchedule = require('../utils/GenerateSchedule')

// @desc    Create new user
// @route   POST /schedules
// @access  Public
exports.createSchedule = asyncHandler(async (req, res) => {
  const startDate = new Date()
  const endDate = new Date('April 01 2020 12:30')

  const scheduleJson = await generateSchedule(startDate, endDate)

  const schedule = await Schedule.create(scheduleJson)
  res.status(201).json({
    success: true,
    data: schedule
  })
})
