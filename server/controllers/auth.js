const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Login = require('../models/Login')

// GET TOKEN FROM MODEL, CREATE COOKIE AND SEND RESPONSE
const sendTokenResponse = (login, statusCode, res) => {
  // CREATE TOKEN
  const token = login.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}

// @desc     Register user
// @route    POST /auth/register
// @access   public
exports.register = asyncHandler(async (req, res) => {
  const { id_user, email, password } = req.body

  const login = await Login.create({
    id_user,
    email,
    password,
    is_active: false
  })

  sendTokenResponse(login, 200, res)
})

// @desc     Login user
// @route    POST /auth/login
// @access   public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // VALIDATE EMAIL & PASSWORD
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  // CHECK FOR USER
  const login = await Login.findOne({ email }).select('+password')

  if (!login) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // CHECK IF PASSWORD MATCHES
  const isMatch = await login.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // CHECK IF USER LOGIN IS ACTIVATED
  if (!login.is_active) {
    return next(new ErrorResponse('User not activated', 401))
  }

  sendTokenResponse(login, 200, res)
})
