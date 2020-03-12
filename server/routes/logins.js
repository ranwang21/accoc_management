const express = require('express')
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
    getLogins
  )
  .post(createLogin)

router
  .route('/:id')
  .get(getLogin)
  .delete(deleteLogin)

module.exports = router
