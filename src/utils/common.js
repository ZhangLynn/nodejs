/**
 * created by LynnZhang on 2019/11/26
 */
// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    return d.toGMTString()
}
// 用于处理postdata数据
const getPostData = (req) => {
    const promise = new Promise ((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({}) // TODO resolve一个空对象就可以
            return
        }
        // 服务器传来的数据 如果不是JSON格式 就忽略 因为我们是原生代码 不做其他格式支持
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = '';
        // 客户端向服务端发送的数据是以数据流的格式,当有数据过来的时候会触发data事件
        req.on('data', chunk => {
            postData += chunk
        });
        req.on('end', () => {
            if (!postData) resolve({})
            // 要把字符串格式转为对象
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

module.exports = {
    getCookieExpires,
    getPostData
}
