/**
 * created by LynnZhang on 2019/11/23
 */
const http = require("http");
const PORT = '9107';
const serverHandle = require('../app');
const server = http.createServer(serverHandle)
server.listen(PORT)
console.log('OK 9107')
