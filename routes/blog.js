/**
 * created by LynnZhang on 2019/11/27
 */
var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/detail', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/new', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/update', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/delete', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
