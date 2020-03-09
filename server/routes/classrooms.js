const express = require('express')
const {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom
} = require('../controllers/classrooms')

const Classroom = require('../models/Classroom')
const advancedResults = require('../middlewares/advancedResults')

// INCLUDE OTHER RESOURCE ROUTERS
const classroomSchedulesRouter = require('./classroomSchedules')

const router = express.Router()

// RE-ROUTE INTO OTHER RESOURCE ROUTERS
router.use('/:classroomId/classroom-schedules', classroomSchedulesRouter)

router
  .route('/')
  .get(advancedResults(Classroom), getClassrooms)
  .post(createClassroom)

router
  .route('/:id')
  .get(getClassroom)
  .put(updateClassroom)
  .delete(deleteClassroom)

module.exports = router
