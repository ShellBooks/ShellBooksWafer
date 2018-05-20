const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  let borrowlist = await mysql("borrow").where({ uid })

  ctx.state.data = {
    borrowlist: borrowlist
  }

}