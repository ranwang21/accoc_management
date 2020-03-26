const express = require('express')
const { createSchedule } = require('../controllers/schedules')

const router = express.Router()

router.route('/').post(createSchedule)

module.exports = router
