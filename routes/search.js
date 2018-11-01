var express = require('express');
var service = require('../services/spotifyService');
var router = express.Router();

router.get('/', (req, res) => {
    //res.send('mock up data.....');
    service.searchMusic("EDEN", "artist")
});

module.exports = router;