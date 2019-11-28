/**
 * created by LynnZhang on 2019/11/23
 */
const { exec } = require('../db/mysql')
// controller 处理数据
const getList = (author, keyword) => {
    // 注意每句后面的空格
    // note 1=1 是为了让后面的拼接没有语法错误
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    // note 注意返回的是 promise
    return exec(sql)
}

const getDetail = (id) =>{
    let sql = `select content from blogs where 1=1 `;
    if (id) {
        sql += `and id='${id}'`
    }
    sql += `order by createtime desc`;
    return exec(sql)
}

const newBlog = (blogData = {}) =>{
    const { title, content, author } = blogData;
    const createTime = Date.now()
    let sql = `insert into blogs (title, content, createtime, author) 
        values ('${title}', '${content}', ${createTime}, '${author}')
    `;
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, updateData = {}) =>{
    const { title, content, author } = updateData;
    const createTime = Date.now();
    if (!id) return;
    let sql = `update blogs set `
    if (title) {
        sql += `title='${title}', `
    }
    if (content) {
        sql += `content='${content}', `
    }
    if (author) {
        sql += `author='${author}', `
    }
    sql += `createtime='${createTime}'`
    sql += `where id=${id}`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
