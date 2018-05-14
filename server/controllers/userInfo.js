const{ mysql } = require('../qcloud')


module.exports = async ctx => {
  let open_id = ctx.query.openId ? ctx.query.openId : ''
  let avatar_url = ctx.query.avatarUrl ? ctx.query.avatarUrl : ''
  let gender = ctx.query.gender ? ctx.query.gender : 0
  let nickname = ctx.query.nickName ? ctx.query.nickName : ''

  var res = await mysql("user").where({open_id}).first()
  
  if(!res){
  	// 首次登陆，初始化用户信息
  	let user = {
  		open_id: open_id,
  		nickname: nickname,
  		avatar_url: avatar_url,
  		gender: gender,
  		money: 0,
  		credit: 100,
  		isVerified: 0
  	}
  	await mysql("user").insert(user)
  	res = await mysql("user").where({open_id}).first()
  }

  ctx.state.data = {
  	userInfo: res
  }
  

}