const { mysql } = require('../qcloud')

module.exports = async ctx => {

  let new_books = await mysql("book")

  ctx.state.data = new_books

}

