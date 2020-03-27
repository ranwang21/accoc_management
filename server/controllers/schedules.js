const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Schedule = require('../models/Schedule')
const generateSchedule = require('../utils/generateSchedules')

// @desc    Create new user
// @route   POST /schedules
// @access  Public
exports.createSchedule = asyncHandler(async (req, res) => {
  const startDate = new Date()
  const endDate = new Date('2020-04-02')

  const scheduleJson = await generateSchedule(startDate, endDate)

  const schedule = await Schedule.create(scheduleJson)
  res.status(201).json({
    success: true,
    data: schedule
  })
})
