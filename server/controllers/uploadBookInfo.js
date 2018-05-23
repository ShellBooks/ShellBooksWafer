const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  let book = ctx.request.body

  // 返回 bid
  let bres = await mysql("book").insert(book)

  // 更新 process
  let process = {
    uid: book.uid,
    bid: bres[0],
    // type = 0 分享
    type: 0,
    date: book.date,
    info: '图书分享请求已提交，等待审核'
  }

  let pres = await mysql("process").insert(process)

  if (pres && bres) {
    ctx.state.data = bres[0]
  } else {
    ctx.state.code = -1
    ctx.state.data = "share error"
  }
  

}

