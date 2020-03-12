const express = require('express')
const { protect } = require('../middlewares/auth')
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
  .get(
    advancedResults(User, {
      path: 'availability',
      select: 'title'
    }),
    protect,
    getUsers
  )
  .post(createUser)

router
  .route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser)

module.exports = router
