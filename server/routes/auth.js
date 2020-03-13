const express = require('express')
const { protect } = require('../middlewares/auth')
const { login, getUser } = require('../controllers/auth')

const router = express.Router()

router.post('/login', login)
router.get('/user', protect, getUser)

module.exports = router
