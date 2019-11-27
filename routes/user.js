/**
 * created by LynnZhang on 2019/11/27
 */
var express = require('express');
var router = express.Router();
const { login } = require('../src/controller/login')
const { SuccessModel, ErrorModel } = require('../src/model/resModel')
router.get('/login', function(req, res, next) {
    const { username, password} = req.query;
    const result = login(username, password);
    return result.then(data => {
        if (data.username) {
            req.session.username = data.username;
            req.session.realname = data.realname;
            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});

module.exports = router;
