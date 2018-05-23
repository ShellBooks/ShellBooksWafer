const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  let sharelist = await mysql('book').where({ uid }).select('bid', 'bname', 'author', 'image')

  ctx.state.data = sharelist

}