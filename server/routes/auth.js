const express = require('express')
const { protect } = require('../middlewares/auth')
const {
  login,
  getUser,
  forgotPassword,
  resetPassword
} = require('../controllers/auth')

const router = express.Router()

router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get(
  '/user',
  // protect,
  getUser
)
router.put('/reset-password/:token', resetPassword)

module.exports = router
