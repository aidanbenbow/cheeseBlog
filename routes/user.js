const express = require('express'),
router = express.Router(),
{ registerUser, logInUser, getMe, logInPage } = require('../controllers/userController')


router.post('/', registerUser)
router.post('/login', logInUser)
router.get('/login', logInPage)
router.get('/', getMe)


module.exports = router