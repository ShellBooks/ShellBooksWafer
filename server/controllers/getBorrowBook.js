const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1
  let type = ctx.query.type ? ctx.query.type : -1

  let borrowlist
  if(type == 2){
    // 借阅记录
    borrowlist = await mysql.raw('SELECT brid, borrow.bid, bname, author, image FROM borrow, book WHERE borrow.uid = ? AND borrow.bid = book.bid AND borrow.status = 2', [uid])
  } else {
    // 当前借书
    borrowlist = await mysql.raw('SELECT brid, borrow.bid, bname, author, image FROM borrow, book WHERE borrow.uid = ? AND borrow.bid = book.bid AND borrow.status <> 2', [uid])
  }

  ctx.state.data = {
    borrowlist: borrowlist[0] //为什么取一项？？0是有效 1是无效？
  }

}