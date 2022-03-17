const express = require('express')
const router = express.Router()

router.post('/signup', signupRoute)
router.post('/login', loginRoute)

module.exports = router