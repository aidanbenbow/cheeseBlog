const express = require('express'),
router = express.Router(),
{allArticles} = require('../controllers/indexController')

router.get('/', allArticles)

module.exports = router