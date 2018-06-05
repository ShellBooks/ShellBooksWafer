const { mysql } = require('../qcloud')

module.exports = async ctx => {

  // status = 1 图书上架
  let new_books = await mysql("book").where({ status: 1 }).orderBy('date', 'desc')

  ctx.state.data = new_books

}

