const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  let schid = ctx.request.body.schid
  let name = ctx.request.body.name
  let phone = ctx.request.body.phone
  let cardimg = ctx.request.body.cardimg
  let uid = ctx.request.body.uid
  let isVerified = -1
  
  let res = await mysql("user").where({ uid }).update({ name, schid, phone, cardimg, isVerified})

  if (res) {
    ctx.state.data = "verify success"
  } else {
    ctx.state.code = -1
    ctx.state.data = "verify error"
  }

  


}