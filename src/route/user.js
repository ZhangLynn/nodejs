/**
 * created by LynnZhang on 2019/11/23
 */
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/login')
const { setRedis } = require('../db/redis')
const handleUserRouter = (req, res) => {
    const method = req.method,
        url = req.url;
    const path = url.split('?')[0];
    if (method === 'GET' && path === '/api/user/login') {
        // const { username = '', password = '' } = req.body;
        const { username = '', password = '' } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                // 设置session
                req.session.username = data.username;
                req.session.realname = data.realname;
                // 同步到Redis
                setRedis(req.sessionId, req.session)
                return new SuccessModel(data)
            }
            return new ErrorModel('登录失败')
        })
    }

    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.session.username
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('登录失败')
        )
    }
}
module.exports = handleUserRouter
