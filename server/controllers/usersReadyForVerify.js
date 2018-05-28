const { mysql } = require('../qcloud')

module.exports = async ctx => {

  // isverified
  // 0 默认
  // -1 申请认证
  // 1 认证成功
  var users = await mysql("user").where({ isVerified: -1}).select('uid', 'name', 'schid', 'phone', 'cardimg')
  
  ctx.state.data = users


}