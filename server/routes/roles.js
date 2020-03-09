const express = require('express')
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
  .get(advancedResults(Role), getRoles)
  .post(createRole)

router
  .route('/:id')
  .get(getRole)
  .put(updateRole)
  .delete(deleteRole)

module.exports = router
