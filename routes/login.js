var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
  console.log(req);
});

router.get('/signup', function(req, res, next) {
    res.send('respond with a resource');
    console.log(req);
  });

module.exports = router;
