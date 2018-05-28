const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  let res = await mysql("admin").where({ aid: uid }).first()

  if(res){
    ctx.state.data = "Admin"
  } else {
    ctx.state.code = -1
    ctx.state.data = "Not admin"
  }

}

