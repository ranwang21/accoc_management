const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Schedule = require('../models/Schedule')
const generateSchedule = require('../utils/generateSchedules')

// @desc     Get all schedules
// @route    GET /schedules
// @route    GET /users/:userId/schedules
// @access   Private
exports.getSchedules = asyncHandler(async (req, res) => {
  if (req.params.userId) {
    const schedule = await Schedule.find({
      id_user: req.params.userId
    })
    res.status(200).json({
      success: true,
      data: schedule
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc    Get single schedule
// @route   GET /schedules/:id
// @access  Private
exports.getSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id)

  if (!schedule) {
    return next(
      new ErrorResponse(`Schedule not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: schedule
  })
})

// @desc    Create schedule
// @route   POST /schedules
// @access  Private
exports.createSchedule = asyncHandler(async (req, res) => {
  const startDate = new Date('2020/04/07')
  const endDate = new Date('2020/04/14')

  const scheduleJson = await generateSchedule(startDate, endDate)

  const schedule = await Schedule.create(scheduleJson)
  res.status(201).json({
    success: true,
    data: schedule
  })
})

// @desc    Update schedule
// @route   PUT /schedules/:id
// @access  Private
exports.updateSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!schedule) {
    return next(
      new ErrorResponse(`Schedule not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: schedule
  })
})

// @desc    Delete schedule
// @route   DELETE /schedules/:id
// @access  Private
exports.deleteSchedule = asyncHandler(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id)

  if (!schedule) {
    return next(
      new ErrorResponse(`Schedule not found with ID: ${req.params.id}`, 404)
    )
  }

  schedule.remove()

  res.status(204).json()
})
