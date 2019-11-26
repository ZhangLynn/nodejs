/**
 * created by LynnZhang on 2019/11/26
 */
const fs = require('fs');
const path = require('path');

// 写入log
const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n')
}

// 生成 write stream
const createWriteStream = (fileName) => {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const ws = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return ws
}

// access log
const accessWS = createWriteStream('access.log')
const access = (log) => {
    writeLog(accessWS, log)
}

module.exports = {
    access
}
