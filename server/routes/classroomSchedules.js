const express = require('express')
const {
  getclassroomSchedules,
  getclassroomSchedule,
  updateclassroomSchedule
} = require('../controllers/classroomSchedules')

const router = express.Router({ mergeParams: true })

router.route('/').get(getclassroomSchedules)

router
  .route('/:id')
  .get(getclassroomSchedule)
  .put(updateclassroomSchedule)

module.exports = router
