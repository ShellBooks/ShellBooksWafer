const { mysql } = require('../qcloud')

// 用户审核不通过
module.exports = async ctx => {

  let uid = ctx.query.uid ? ctx.query.uid : -1

  // 将审核状态改为 0
  let ures = await mysql("user").where({ uid }).update({ isVerified: 0 })

  if(ures){
    ctx.state.data = {
      status: 0,
      msg: 'success'
    }
  } else {
    ctx.state.data = {
      status: -1,
      msg: 'error'
    }
  }

}