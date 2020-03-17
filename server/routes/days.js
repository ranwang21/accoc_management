const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getDays,
  getDay,
  createDay,
  updateDay,
  deleteDay
} = require('../controllers/days')

const Day = require('../models/Day')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router()

router
  .route('/')
  .get(advancedResults(Day), authorize('admin', 'high_admin'), protect, getDays)
  .post(protect, authorize('admin', 'high_admin'), createDay)

router
  .route('/:id')
  .get(protect, getDay)
  .put(protect, authorize('admin', 'high_admin'), updateDay)
  .delete(protect, authorize('admin', 'high_admin'), deleteDay)

module.exports = router
