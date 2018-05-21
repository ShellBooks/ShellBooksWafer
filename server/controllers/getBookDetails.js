const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let bid = ctx.query.bid ? ctx.query.bid : -1

  let book_details = await mysql("book").where({ bid }).first()

  ctx.state.data = book_details

}

