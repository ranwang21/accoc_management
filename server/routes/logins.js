const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getLogins,
  getLogin,
  createLogin,
  updateLoginStatus,
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
    authorize('admin', 'super_admin'),
    getLogins
  )
  .post(createLogin)

router
  .route('/:id')
  .get(protect, getLogin)
  .put(protect, authorize('admin', 'super_admin'), updateLoginStatus)
  .delete(protect, authorize('admin', 'super_admin'), deleteLogin)

module.exports = router
