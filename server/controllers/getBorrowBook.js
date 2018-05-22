const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  let borrowlist = await mysql.raw('SELECT borrow.bid, bname, author, image FROM borrow, book WHERE borrow.uid = ? AND borrow.bid = book.bid', [uid])

  ctx.state.data = {
    borrowlist: borrowlist[0] //为什么取一项？？0是有效 1是无效？
  }

}