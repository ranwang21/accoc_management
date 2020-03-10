const express = require('express')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users')

const User = require('../models/User')
const advancedResults = require('../middlewares/advancedResults')

// INCLUDE OTHER RESOURCE ROUTERS
const LoginsRouter = require('./logins')

const router = express.Router()

// RE-ROUTE INTO OTHER RESOURCE ROUTERS
router.use('/:userId/logins', LoginsRouter)

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router
