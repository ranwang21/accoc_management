const express = require('express')
const {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom
} = require('../controllers/classrooms')

// INCLUDE OTHER RESOURCE ROUTERS
const classroomSchedulesRouter = require('./classroomSchedules')

const router = express.Router()

// RE-ROUTE INTO OTHER RESOURCE ROUTERS
router.use('/:classroomId/classroom-schedules', classroomSchedulesRouter)

router
  .route('/')
  .get(getClassrooms)
  .post(createClassroom)

router
  .route('/:id')
  .get(getClassroom)
  .put(updateClassroom)
  .delete(deleteClassroom)

module.exports = router
