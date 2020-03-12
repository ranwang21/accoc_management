const express = require('express')
const { protect } = require('../middlewares/auth')
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
  .get(advancedResults(Classroom), protect, getClassrooms)
  .post(protect, createClassroom)

router
  .route('/:id')
  .get(protect, getClassroom)
  .put(protect, updateClassroom)
  .delete(protect, deleteClassroom)

module.exports = router
