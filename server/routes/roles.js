const express = require('express')
const { protect } = require('../middlewares/auth')
const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/roles')

const Role = require('../models/Role')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router()

router
  .route('/')
  .get(advancedResults(Role), protect, getRoles)
  .post(protect, createRole)

router
  .route('/:id')
  .get(protect, getRole)
  .put(protect, updateRole)
  .delete(protect, deleteRole)

module.exports = router
