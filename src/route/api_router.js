const express = require('express');
const router = express.Router();
const apiController = require('../controller/api_controller')


// [GET] /api/Hello
router.get('/Hello', apiController.greeting)

// [POST] /api/shorturl
router.post('/shorturl', apiController.saveNewShortUrl)

// [GET] /api/shorturl/:shorturl
router.get('/shorturl/:shorturl', apiController.getWebFromShortUrl)

module.exports = router;
