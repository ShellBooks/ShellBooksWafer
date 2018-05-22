const{ mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  var share = await mysql("book").where({uid})
  var borrow = await mysql("borrow").where({uid})

  ctx.state.data = {
  	share: share.length,
    borrow: borrow.length
  }
  

}