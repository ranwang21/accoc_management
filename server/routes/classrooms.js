const express = require('express')
const {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom
} = require('../controllers/classrooms')

const router = express.Router()

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
