const express = require('express')
const { signupRoute, loginRoute } = require('../controllers/user')
const router = express.Router()

router.post('/signup', signupRoute)
router.post('/login', loginRoute)

module.exports = router