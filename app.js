/**
 * created by LynnZhang on 2019/11/22
 */
const querystring = require("querystring")
const handleBlogRouter = require('./src/route/blog')
const handleUserRouter = require('./src/route/user')
const { access } = require('./src/utils/log')
const { getRedis, setRedis } = require('./src/db/redis')
const { getCookieExpires, getPostData } = require('./src/utils/common')

const serverHandle = (req, res) => {
    // 进行访问的日志记录
    access(
        `${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`
    )
    const url = req.url;
    const path = url.split('?')[0];
    req.path = path;
    // 解析参数
    req.query = querystring.parse(url.split('?')[1]);
    // 设置cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return
        const arr = item.split('=')
        // TODO 去空格很重要 不然相同的值会被识别为不同的值
        req.cookie[arr[0].trim()] = arr[1].trim()
    })
    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userid;
    if (userId) {
        getRedis(userId).then(data => {
            if (!data) {
                // 初始化session 再设置
                setRedis(userId, {})
            }
        })
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`;
        // 初始化session 再设置
        setRedis(userId, {});
    }
    getPostData(req).then(postData => {
        req.body = postData;
        // 查找Redis 每次进路由前查找
        const redisResult = getRedis(userId);
        if (redisResult) {
            redisResult.then(data => {
                req.session = data;
                req.sessionId = userId;
                // 处理blog路由
                const blogResult = handleBlogRouter(req, res);
                if (blogResult) {
                    blogResult.then(blogData => {
                        // todo 没有userID的时候 设置其为cookie
                        if (needSetCookie) {
                            res.setHeader('Set-Cookie', `userid=${userId}; path='/'; httpOnly; expires=${getCookieExpires()}`)
                        }
                        res.end(JSON.stringify(blogData))
                    })
                    // todo 一定要return 不然会继续执行
                    return
                }
                // 处理user路由
                const userResult = handleUserRouter(req, res);
                if (userResult) {
                    userResult.then(userData => {
                        if (needSetCookie) {
                            res.setHeader('Set-Cookie', `userid=${userId}; path='/'; httpOnly; expires=${getCookieExpires()}`)
                        }
                        res.end(JSON.stringify(userData))
                    })
                    // 一定要return 不然会继续执行
                    return
                }
                // 如果未命中已有路由
                res.writeHead(404, {'Content-type': 'text/plain'});
                res.write('404 not found');
                res.end()
            })
        }
    })


    // const method = req.method,
    //     url = req.url;
    // const path = url.split('?')[0],
    //     query = querystring.parse(url.split('?')[1]);
    // // 设置返回格式为JSON
    // res.setHeader('Content-type', 'application/json')
    // // 返回数据
    // const resData = {
    //     method,
    //     url,
    //     path,
    //     query
    // }
    // if (method === 'POST') {
    //     console.log(req.headers['content-type'])
    //     let postData = '';
    //     // 客户端向服务端发送的数据是以数据流的格式,当有数据过来的时候会触发data事件
    //     req.on('data', chunk => {
    //         postData += chunk
    //     });
    //     req.on('end', () => {
    //         console.log(postData)
    //         res.end(JSON.stringify(resData))
    //     })
    // } else if (method === 'GET') {
    //     // 一定要返回字符串 设置格式 只是设置为JSON格式的字符串
    //     res.end(JSON.stringify(resData))
    // }
    // // req.query是一个对象 新建属性挂载在上面
    // req.query = query;
    // res.end(JSON.stringify(req.query))
}
module.exports = serverHandle
