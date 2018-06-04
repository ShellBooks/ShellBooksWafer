const { mysql } = require('../qcloud')

module.exports = async ctx => {

  // status = 2 图书上架
  let new_books = await mysql("book").where({ status: 2 })

  ctx.state.data = new_books

}

