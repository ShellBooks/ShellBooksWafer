const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  let uid = ctx.request.body.uid
  let bid = ctx.request.body.bid
  let favourite = ctx.request.body.favourite
  let res

  if(favourite == 1){
    //收藏
    res = await mysql("like").insert({uid, bid})
    // let res = await mysql.raw('INSERT INTO `like` (uid, bid) VALUES (?, ?) ', [uid],[bid])
  }else{
    //取消收藏
    res = await mysql("like").where({uid, bid}).del()
    // let res = await mysql.raw('DELETE `like` WHERE uid=? AND bid=?', [uid], [bid])
  }
  
  
  if (res) {
    ctx.state.data = "uploadLike success"
  } else {
    ctx.state.code = -1
    ctx.state.data = "uploadLike error"
  }
}