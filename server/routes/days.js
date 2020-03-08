const express = require('express')
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
  .get(advancedResults(Day), getDays)
  .post(createDay)

router
  .route('/:id')
  .get(getDay)
  .put(updateDay)
  .delete(deleteDay)

module.exports = router
