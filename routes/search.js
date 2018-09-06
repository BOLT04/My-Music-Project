var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('mock up data.....');
});

module.exports = router;