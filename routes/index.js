var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `Welcome to Ling's blog api`, content: `Enjoy your time` });
});

module.exports = router;
