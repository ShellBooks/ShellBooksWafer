const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  let schid = ctx.request.body.schid
  let name = ctx.request.body.name
  let phone = ctx.request.body.phone
  let image = ctx.request.body.image
  let uid = ctx.request.body.uid
  
  let res = await mysql("borrow").where({ uid }).update({ status: 400 })

  if (res) {
    ctx.state.code= -2
    ctx.state.data = "upload success"
  } else {
    ctx.state.code = -1
    ctx.state.date = "upload error"
  }

  


}