/**
 * created by LynnZhang on 2019/11/23
 */
// router 只处理路由 匹配路由 然后返回正确格式
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')

// 登录验证中间件
const checkLogin = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}
const handleBlogRouter = (req, res) => {
    const method = req.method
    res.setHeader('Content-type', 'application/json')
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '',
            keyword = req.query.keyword || '';
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || '';
        const result = getDetail(id)
        return result.then(content => {
            return new SuccessModel(content)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        const checkLoginResult = checkLogin(req);
        if (checkLoginResult) {
            return checkLogin
        }
        const result = newBlog(req.body);
        return result.then(insertData => {
            return new SuccessModel(insertData)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const checkLoginResult = checkLogin(req);
        if (checkLoginResult) {
            return checkLogin
        }
        const id = req.query.id || ''
        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel(val)
            } else {
                return new ErrorModel('更新失败')
            }

        })
    }
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const checkLoginResult = checkLogin(req);
        if (checkLoginResult) {
            return checkLogin
        }
        const id = req.query.id || '';
        const author = req.body.author ||'';
        const result = deleteBlog(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel(val)
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }
}
module.exports = handleBlogRouter
