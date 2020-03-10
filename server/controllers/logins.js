const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Login = require('../models/Login')

// @desc     Get all logins
// @route    GET /logins
// @route    GET /users/:userId/logins
// @access   Private
exports.getLogins = asyncHandler(async (req, res) => {
  if (req.params.userId) {
    const login = await Login.findOne({
      id_user: req.params.userId
    }).populate({
      path: 'id_user',
      select: 'first_name last_name id_role'
    })
    res.status(200).json({
      success: true,
      data: login
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc     Get single login
// @route    GET /logins/:id
// @access   Private
exports.getLogin = asyncHandler(async (req, res, next) => {
  const login = await Login.findById(req.params.id).populate({
    path: 'id_user',
    select: 'first_name last_name id_role'
  })

  if (!login) {
    return next(
      new ErrorResponse(`Login not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: login
  })
})

// @desc     Create login to user
// @route    POST /logins
// @access   public
exports.createLogin = asyncHandler(async (req, res) => {
  const { id_user, email, password } = req.body

  const login = await Login.create({
    id_user,
    email,
    password,
    is_active: false
  })

  res.status(200).json({
    success: true,
    data: login
  })
})

// @desc    Delete login
// @route   DELETE /logins/:id
// @access  Private
exports.deleteLogin = asyncHandler(async (req, res, next) => {
  const login = await Login.findByIdAndDelete(req.params.id)

  if (!login) {
    return next(
      new ErrorResponse(`Login not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(204).json()
})
