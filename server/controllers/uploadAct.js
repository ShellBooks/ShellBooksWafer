const { mysql } = require('../qcloud')

module.exports = async ctx => {

  let banner = {}
  banner.title = ctx.request.body.title
  banner.intro = ctx.request.body.intro
  banner.image = ctx.request.body.image

  let res = await mysql("banner").insert(banner)

  if (res) {
    ctx.state.data = "上传成功"
  } else {
    ctx.state.code = -1
    ctx.state.data = "上传成功"
  }

}

