const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const ClassroomSchedule = require('../models/ClassroomSchedule')

// @desc     Get all classroom schedules
// @route    GET /classroom-schedules
// @route    GET /classrooms/:classroomId/classroom-schedules
// @access   Private
exports.getclassroomSchedules = asyncHandler(async (req, res) => {
  let query

  if (req.params.classroomId) {
    query = ClassroomSchedule.findOne({ id_classroom: req.params.classroomId })
  } else {
    query = ClassroomSchedule.find()
  }
  const classroomSchedules = await query.populate({
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
