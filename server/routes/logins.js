const express = require('express')
const { getLogins, getLogin, createLogin } = require('../controllers/logins')

const Login = require('../models/Login')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router()

router
  .route('/')
  .get(advancedResults(Login), getLogins)
  .post(createLogin)

router.route('/:id').get(getLogin)

module.exports = router
