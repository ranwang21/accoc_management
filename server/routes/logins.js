const express = require('express')
const { protect } = require('../middlewares/auth')
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
    advancedResults(Login, {
      path: 'id_user',
      select: 'id_role'
    }),
    protect,
    getLogins
  )
  .post(createLogin)

router
  .route('/:id')
  .get(protect, getLogin)
  .delete(protect, deleteLogin)

module.exports = router
