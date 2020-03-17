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
  .get(
    advancedResults(Day),
    // authorize('admin'),
    // protect,
    getDays
  )
  .post(
    // protect,
    // authorize('admin'),
    createDay
  )

router
  .route('/:id')
  .get(
    // protect,
    getDay
  )
  .put(
    // protect,
    // authorize('admin'),
    updateDay
  )
  .delete(
    // protect,
    // authorize('admin'),
    deleteDay
  )

module.exports = router
