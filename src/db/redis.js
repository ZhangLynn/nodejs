/**
 * created by LynnZhang on 2019/11/25
 */
const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// apply redis-configuration to create a redis client
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

module.exports = redisClient;
