const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  let book = {
    bname: ctx.request.body.bname,
    author: ctx.request.body.author,
    publish: ctx.request.body.publish,
    price: ctx.request.body.price,
    ISBN: ctx.request.body.ISBN,
    image: ctx.request.body.image,
    rate: ctx.request.body.rate,
    status: ctx.request.body.status,
    date: ctx.request.body.date,
    uid: ctx.request.body.uid,
  }
  let info = ctx.request.body.info

  // 返回 bid
  let bres = await mysql("book").insert(book)

  // 更新 process
  let process = {
    uid: book.uid,
    bid: bres[0],
    // type = 0 分享
    type: 0,
    date: book.date,
    info: info
  }

  let pres = await mysql("process").insert(process)

  if (pres && bres) {
    ctx.state.data = bres[0]
  } else {
    ctx.state.code = -1
    ctx.state.data = "share error"
  }
  
}

