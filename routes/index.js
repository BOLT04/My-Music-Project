var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index2', {title: 'My Music', successMsg: req.flash('successMsg')});
});

module.exports = router;
