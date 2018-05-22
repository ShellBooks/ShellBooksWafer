const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  let bname = ctx.request.body.bname
  let author = ctx.request.body.author
  let publish = ctx.request.body.publish
  let price = ctx.request.body.price
  let ISBN = ctx.request.body.ISBN
  let image = ctx.request.body.image
  let date = ctx.request.body.date
  let uid = ctx.request.body.uid
  let rate = ctx.request.body.rate
  let status = ctx.request.body.status

  let res = await mysql("book").insert({uid, bname, author, image, publish, price, ISBN, date, rate, status})

  if(res){
    ctx.state.data = "upload success"
  } else {
    ctx.state.code = -1
    ctx.state.date = "upload error"
  }
  

}

