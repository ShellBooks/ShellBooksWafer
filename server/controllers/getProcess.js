const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let query = ctx.query

  let process = await mysql("process").where(query).select('date', 'info')

  ctx.state.data = process

}

