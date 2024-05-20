const express = require('express'),
router = express.Router(),
{ getLetter, createLetter } = require('../controllers/dorcasController')



router.get('/', getLetter)

router.post('/', createLetter)

module.exports = router