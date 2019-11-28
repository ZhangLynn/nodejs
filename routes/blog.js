/**
 * created by LynnZhang on 2019/11/27
 */
var express = require('express');
var router = express.Router();
const { getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog } = require('../src/controller/blog');
const loginCheck = require('../src/middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../src/model/resModel')
router.get('/list', (req, res, next) => {
    const {author, keyword} = req.query;
    const result = getList(author, keyword)
    return result.then(data => {
        if (data) {
            res.json(new SuccessModel(data));
            return
        }
        res.json(new ErrorModel())
    })
});

router.get('/detail', loginCheck, (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        if (data) {
            res.json(new SuccessModel(data));
            return
        }
        res.json(new ErrorModel())
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    const result = newBlog(req.body)
    return result.then(data => {
        if (data) {
            res.json(new SuccessModel(data));
            return
        }
        res.json(new ErrorModel())
    })
});

router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id,req.body)
    return result.then(data => {
        if (data) {
            res.json(new SuccessModel(data));
            return
        }
        res.json(new ErrorModel())
    })
});

router.post('/delete', loginCheck, (req, res, next) => {
    const result = deleteBlog(req.query.id,req.body)
    return result.then(data => {
        if (data) {
            res.json(new SuccessModel(data));
            return
        }
        res.json(new ErrorModel())
    })
});

module.exports = router;
