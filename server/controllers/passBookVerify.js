const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let status = ctx.request.body.status
  let bid = ctx.request.body.bid

  let res = await mysql("book").where({ bid }).update({ status })

  if (res) {
    ctx.state.data = "审核成功"
  } else {
    ctx.state.code = -1
    ctx.state.data = "审核失败"
  }

}

