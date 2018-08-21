var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {title: 'My Music', successLoginMsg: req.flash('successLoginMsg')});
});

module.exports = router;
