const express = require('express')
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
  getclassroomSchedules
)

router
  .route('/:id')
  .get(getclassroomSchedule)
  .put(updateclassroomSchedule)

module.exports = router
