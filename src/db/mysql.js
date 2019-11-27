/**
 * created by LynnZhang on 2019/11/24
 */
const mysql = require('mysql');
const redis = require('redis')
const { MYSQL_CONF } = require('../config/db')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
})

con.connect();

// 统一执行SQL函数

const exec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}
