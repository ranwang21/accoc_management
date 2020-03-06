const express = require('express')
const {
  getclassroomSchedules,
  getclassroomSchedule,
  createclassroomSchedule,
  updateclassroomSchedule,
  deleteclassroomSchedule
} = require('../controllers/classroomSchedules')

const router = express.Router()

router
  .route('/')
  .get(getclassroomSchedules)
  .post(createclassroomSchedule)

router
  .route('/:id')
  .get(getclassroomSchedule)
  .put(updateclassroomSchedule)
  .delete(deleteclassroomSchedule)

module.exports = router
