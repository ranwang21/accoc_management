const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule
} = require('../controllers/schedules')

const Schedule = require('../models/Schedule')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(advancedResults(Schedule), getSchedules)
  .post(createSchedule)

router
  .route('/:id')
  .get(getSchedule)
  .put(updateSchedule)
  .delete(deleteSchedule)

module.exports = router
