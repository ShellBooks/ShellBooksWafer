const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let process = ctx.request.body
  let borrow = {
    uid: process.uid,
    bid: process.bid,
    status: 0
  }
  let bid = process.bid
  
  // 查询图书是否被借出
  // status 
  // 0 默认 借书请求
  // 1 借书
  // 2 还书
  let isBorrowed = await mysql("borrow").where({ bid }).select('status').orderBy('borrow_date', 'desc').first()

  if(isBorrowed && isBorrowed.status != 2){
    // 该书被借出
    ctx.state.data = {
      msg: "该书被借出，先收藏起来吧~",
      status: isBorrowed.status 
    }
  } else {
    let pres = await mysql("process").insert(process)
    let bres = await mysql("borrow").insert(borrow)

    if (pres && bres) {
      ctx.state.data = "borrow success"
    } else {
      ctx.state.code = -1
      ctx.state.data = "borrow error"
    }
  }

  

}

