const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
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
  .get(
    advancedResults(Classroom),
    // protect,
    // authorize('admin'),
    getClassrooms
  )
  .post(
    // protect,
    // authorize('admin'),
    createClassroom
  )

router
  .route('/:id')
  .get(
    // protect,
    getClassroom
  )
  .put(
    //  protect,
    // authorize('admin'),
    updateClassroom
  )
  .delete(
    // protect,
    // authorize('admin'),
    deleteClassroom
  )

module.exports = router
