const { mysql } = require('../qcloud')

module.exports = async ctx => {

  let res = await mysql("banner")

  ctx.state.data = res

}

