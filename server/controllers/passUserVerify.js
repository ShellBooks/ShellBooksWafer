const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let isVerified = ctx.request.body.isVerified
  let uid = ctx.request.body.uid

  let res = await mysql("user").where({uid}).update({isVerified})

  if(res){
    ctx.state.data = "审核成功"
  } else {
    ctx.state.code = -1
    ctx.state.data = "审核失败"
  }

}

