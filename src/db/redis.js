/**
 * created by LynnZhang on 2019/11/25
 */
const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.log(err)
})

const setRedis = (key, val) => {
    if (typeof val === 'object') {
        // key和val必须是字符串
        val = JSON.stringify(val)
    }
    // todo print是什么 是一个function
    redisClient.set(key, val, redis.print)
}

const getRedis = (key) => {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            // 如果没查到值 要返回一个空
            if (val == null) {
                resolve(null)
            }
            // todo 如果是JSON字符串对象 反解后返回对象 如果不是直接返回原格式
            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
            resolve(val)
        })
    })
    return promise
}

module.exports = {
    setRedis,
    getRedis
}
