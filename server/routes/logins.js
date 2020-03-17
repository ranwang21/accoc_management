const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getLogins,
  getLogin,
  createLogin,
  deleteLogin
} = require('../controllers/logins')

const Login = require('../models/Login')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Login),
    protect,
    authorize('admin', 'high_admin'),
    getLogins
  )
  .post(createLogin)

router
  .route('/:id')
  .get(protect, getLogin)
  .delete(protect, authorize('admin', 'high_admin'), deleteLogin)

module.exports = router
