const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
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
    advancedResults(User),
    protect,
    authorize('admin', 'high_admin'),
    getUsers
  )
  .post(createUser)

router
  .route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, authorize('admin', 'high_admin'), deleteUser)

module.exports = router
