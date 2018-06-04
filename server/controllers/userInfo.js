const{ mysql } = require('../qcloud')


module.exports = async ctx => {
  let open_id = ctx.query.openId ? ctx.query.openId : ''
  let avatar_url = ctx.query.avatarUrl ? ctx.query.avatarUrl : ''
  let gender = ctx.query.gender ? ctx.query.gender : 1
  let nickname = ctx.query.nickName ? ctx.query.nickName : ''

  res = await mysql("user").where({ open_id }).select('uid', 'avatar_url', 'gender', 'nickname', 'open_id').first()
  
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
    // 获取用户基本信息 基本信息长期不会改变
  	res = await mysql("user").where({open_id}).select('uid', 'avatar_url', 'gender', 'nickname', 'open_id').first()
  }

  ctx.state.data = {
  	userInfo: res
  }

}