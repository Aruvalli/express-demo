var express = require('express');
var router = express.Router();

router.get('/device/:id', function (req, res, next) {
    res.send('respond with a resource');
    console.log(req);
});

router.post('/device', function (req, res, next) {
    res.send('respond with a resource');
    console.log(req);
});


router.delete('/device/:id', function (req, res, next) {
    res.send('respond with a resource');
    console.log(req);
});

router.post('/device/:id', function(req, res, next) {
    res.send('respond with a resource');
    console.log(req);
  });

router.get('/signup', function (req, res, next) {
    res.send('respond with a resource');
    console.log(req);
});

module.exports = router;
