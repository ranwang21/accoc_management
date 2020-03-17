const express = require('express')
const { protect } = require('../middlewares/auth')
const {
  login,
  getUser,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../controllers/auth')

const router = express.Router()

router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get('/user', protect, getUser)
router.put('/reset-password/:token', resetPassword)
router.put('/update-password', protect, updatePassword)

module.exports = router
