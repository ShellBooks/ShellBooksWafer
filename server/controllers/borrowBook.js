const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let borrow = ctx.request.body

  let res = await mysql("borrow").insert(borrow)

  ctx.state.data = res

}

