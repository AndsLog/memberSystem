var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '會員系統' });
});

router.get('/user', function (req, res, next) {
  res.render('user', { title: '成員' });
});

module.exports = router;
