const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const ClassroomSchedule = require('../models/ClassroomSchedule')

// @desc     Get all classroom schedules
// @route    GET /classroom-schedules
// @access   Private
exports.getclassroomSchedules = asyncHandler(async (req, res) => {
  const classroomSchedules = await ClassroomSchedule.find().populate({
    path: 'id_day',
    select: 'title'
  })
  res.status(200).json(classroomSchedules)
})

// @desc    Get single classroom schedule
// @route   GET /classroom-schedules/:id
// @access  Private
exports.getclassroomSchedule = asyncHandler(async (req, res, next) => {
  const classroomSchedule = await ClassroomSchedule.findById(
    req.params.id
  ).populate({
    path: 'id_day',
    select: 'title'
  })

  if (!classroomSchedule) {
    return next(
      new ErrorResponse(
        `classroomSchedule not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json(classroomSchedule)
})

// @desc    Create new classroom schedule
// @route   POST /classroom-schedules
// @access  Private
exports.createclassroomSchedule = asyncHandler(async (req, res) => {
  const classroomSchedule = await (
    await ClassroomSchedule.create(req.body)
  ).populate({
    path: 'id_day',
    select: 'title'
  })
  res.status(201).json(classroomSchedule)
})

// @desc    Update classroom schedule
// @route   PUT /classroom-schedules/:id
// @access  Private
exports.updateclassroomSchedule = asyncHandler(async (req, res, next) => {
  const classroomSchedule = await ClassroomSchedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate({
    path: 'id_day',
    select: 'title'
  })

  if (!classroomSchedule) {
    return next(
      new ErrorResponse(
        `classroomSchedule not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json(classroomSchedule)
})

// @desc    Delete classroom schedule
// @route   DELETE /classroom-schedules/:id
// @access  Private
exports.deleteclassroomSchedule = asyncHandler(async (req, res, next) => {
  const classroomSchedule = await ClassroomSchedule.findByIdAndDelete(
    req.params.id
  )

  if (!classroomSchedule) {
    return next(
      new ErrorResponse(
        `classroomSchedule not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(204).json()
})
