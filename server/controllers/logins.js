const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Login = require('../models/Login')

// @desc     Get all logins
// @route    GET /logins
// @access   public
exports.getLogins = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single login
// @route   GET /logins/:id
// @access  public
exports.getLogin = asyncHandler(async (req, res, next) => {
  const login = await Login.findById(req.params.id)

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

// @desc    Create new login
// @route   POST /logins
// @access  public
exports.createLogin = asyncHandler(async (req, res) => {
  const login = await Login.create(req.body)
  res.status(201).json({
    success: true,
    data: login
  })
})
