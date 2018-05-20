const{ mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  var lend = await mysql("book").where({uid})
  var borrow = await mysql("borrow").where({uid})

  ctx.state.data = {
  	lend: lend.length,
    borrow: borrow.length
  }
  

}