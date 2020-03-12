const express = require('express')
const { login, getUser } = require('../controllers/auth')

const router = express.Router()

const { protect } = require('../middlewares/auth')

router.post('/login', login)
router.get('/user', protect, getUser)

module.exports = router
