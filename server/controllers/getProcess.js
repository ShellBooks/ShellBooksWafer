const { mysql } = require('../qcloud')

module.exports = async ctx => {
  
  let query = {
    bid: ctx.query.bid,
    uid: ctx.query.uid,
    type: ctx.query.type
  }
  if (ctx.query.brid) {
    query.brid = ctx.query.brid
  }

  let process = await mysql("process").where(query).select('date', 'info')

  ctx.state.data = process

}

