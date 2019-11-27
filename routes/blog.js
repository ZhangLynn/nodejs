/**
 * created by LynnZhang on 2019/11/27
 */
/**
 * created by LynnZhang on 2019/11/27
 */
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    const { username, password} = req.body;
    res.send(username + password);
});

module.exports = router;
