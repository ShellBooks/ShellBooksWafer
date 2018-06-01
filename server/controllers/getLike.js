const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1
  let bid = ctx.query.bid ? ctx.query.bid : -1
  let like = await mysql("like").where({ uid, bid }).first()
  let favourite
  if(like != null){
    favourite = 1
  }else{
    favourite = 0
  }
  ctx.state.data = favourite

}

