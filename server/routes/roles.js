const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
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
  .get(
    advancedResults(Role),
    protect,
    authorize('admin', 'high_admin'),
    getRoles
  )
  .post(protect, authorize('admin', 'high_admin'), createRole)

router
  .route('/:id')
  .get(protect, getRole)
  .put(protect, authorize('admin', 'high_admin'), updateRole)
  .delete(protect, authorize('admin', 'high_admin'), deleteRole)

module.exports = router
