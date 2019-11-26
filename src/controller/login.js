/**
 * created by LynnZhang on 2019/11/24
 */
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crpy')

const login = (username, password) => {
    // todo 使用escape转义后 sql拼接不需要''了
    username = escape(username);
    password = escape(genPassword(password));
    console.log(password)
    let sql = `select username, realname from users where username=${username} and password=${password}`
    console.log(sql)
    const result = exec(sql);
    return result.then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}
