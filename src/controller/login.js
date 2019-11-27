/**
 * created by LynnZhang on 2019/11/24
 */
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crpy')

const login = (username, password) => {
    // notice when using escape join, sql do not need '' anymore
    username = escape(username);
    password = escape(genPassword(password));
    let sql = `select username, realname from users where username=${username} and password=${password}`
    const result = exec(sql);
    return result.then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}
