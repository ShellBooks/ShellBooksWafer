const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  // let uid = ctx.request.body.uid
  // let bid = ctx.request.body.bid
  // let favourite = ctx.request.body.favourite
  // let likeData = {
  //   uid: uid,
  //   bid: bid
  // }
  // if(favourite == 1){
  //   //收藏
  //   let res = await mysql("like").insert(likeData)
  //   // let res = await mysql.raw('INSERT INTO `like` (uid, bid) VALUES (?, ?) ', [uid],[bid])
  // }else{
  //   //取消收藏
  //   //  let res = await mysql("like").where({uid, bid}).del()
  //   let res = await mysql.raw('DELETE `like` WHERE uid=? AND bid=?', [uid], [bid])
  // }
  
  ctx.state.data = {
    msg : 'Hello World'
  }
  // if(res){
  //   ctx.state.data = res
  // }else{
  //   ctx.state.data = "erewioarjoaw"
  // }
  // if (res) {
  //   ctx.state.data = "uploadLike success"
  // } else {
  //   ctx.state.code = -1
  //   ctx.state.date = "uploadLike error"
  // }
}