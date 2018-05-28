const { mysql } = require('../qcloud')
/**
 * 上传评论
 */
module.exports = async ctx => {
  // POST 请求 获取 data
  // let uid = ctx.request.body.uid
  // let bid= ctx.request.body.bid
  // let date = ctx.request.body.date
  // let rate = ctx.request.body.rate
  // let content = ctx.request.body.content

  let comment = ctx.request.body

  let cres = await mysql("comment").insert(comment)

  if (cres) {
    ctx.state.data = "post success"
  } else {
    ctx.state.code = -1
    ctx.state.date = "post failed"
  }




}