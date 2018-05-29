const { mysql } = require('../qcloud')

// 借阅管理API
module.exports = async ctx => {

  // statue
  // 0 默认 借书请求
  // 1 获得图书 扣除相应贝壳数
  // 2 归还图书 归还相应贝壳数 
  let borrow = await mysql.raw("SELECT user.uid, schid, phone, book.bid, name, bname, author, ISBN, image, shell FROM user, book, borrow WHERE user.uid = borrow.uid AND book.bid = borrow.bid AND borrow.status = 0")

  ctx.state.data = borrow[0]

}