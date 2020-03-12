const express = require('express')
const { protect } = require('../middlewares/auth')
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
  .get(advancedResults(Day), protect, getDays)
  .post(protect, createDay)

router
  .route('/:id')
  .get(protect, getDay)
  .put(protect, updateDay)
  .delete(protect, deleteDay)

module.exports = router
