const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1
  let bid = ctx.query.bid ? ctx.query.bid : -1

  let borrowDetails = await mysql.raw('SELECT borrow.bid, borrow.uid, bname, author, image, rate, shell, borrow_date, return_date FROM borrow, book WHERE borrow.uid = ? AND borrow.bid = book.bid AND borrow.status = 2', [uid])

  ctx.state.data = borrowDetails[0][0]

}