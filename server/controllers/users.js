const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const User = require('../models/User')

// @desc     Get all users
// @route    GET /users
// @access   Private
exports.getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single user
// @route   GET /user/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: 'availability',
    select: 'title'
  })

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: user
  })
})

// @desc    Create new user
// @route   POST /users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const user = await (await User.create(req.body)).populate({
    path: 'availability',
    select: 'title'
  })
  res.status(201).json({
    success: true,
    data: user
  })
})

// @desc    Update user
// @route   PUT /users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate({
    path: 'availability',
    select: 'title'
  })

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: user
  })
})

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  user.remove()

  res.status(204).json()
})
