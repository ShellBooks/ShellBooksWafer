const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  let likelist = await mysql.raw('SELECT like.bid, bname, author, image FROM like, book WHERE like.uid = ? AND like.bid = book.bid', [uid])

  ctx.state.data = {
    likelist: likelist[0] //为什么取一项？？0是有效 1是无效？
  }

}