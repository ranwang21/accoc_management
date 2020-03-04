const express = require('express')
const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/roles')

const router = express.Router()

router
  .route('/')
  .get(getRoles)
  .post(createRole)

router
  .route('/:id')
  .get(getRole)
  .put(updateRole)
  .delete(deleteRole)

module.exports = router
