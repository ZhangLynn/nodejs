/**
 * created by LynnZhang on 2019/11/24
 */
const mysql = require('mysql');
// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行SQL语句
const sql = 'select id, username from users';
const sqlupdate = `update users set realname='lynn' where username='ling'`
const sqlblog = `select * from blogs where 1=1 and author='ling' and title like '%A%' order by createtime desc`
con.query(sqlblog, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result)
})
