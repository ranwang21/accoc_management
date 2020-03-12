const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getclassroomSchedules,
  getclassroomSchedule,
  updateclassroomSchedule
} = require('../controllers/classroomSchedules')

const ClassroomSchedule = require('../models/ClassroomSchedule')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })

router.route('/').get(
  advancedResults(ClassroomSchedule, {
    path: 'id_day',
    select: 'title value'
  }),
  protect,
  authorize('admin'),
  getclassroomSchedules
)

router
  .route('/:id')
  .get(protect, getclassroomSchedule)
  .put(protect, authorize('admin'), updateclassroomSchedule)

module.exports = router
