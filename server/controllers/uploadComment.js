const { mysql } = require('../qcloud')
/**
 * 上传评论
 */
module.exports = async ctx => {
  // POST 请求 获取 data
  let comment = ctx.request.body
  let bid = ctx.request.body.bid
  let uid = ctx.request.body.uid

  let isCommented = await mysql("comment").where({ bid, uid}).first()
  if(isCommented){
    ctx.state.data = {
      status: -1,
      msg: '您已评论过该书'
    }
  } else {
    let cres = await mysql("comment").insert(comment)
    // 获取图书的评分
    let rates = await mysql("comment").avg('rate as rateAvg').where({ bid }).first()
    // 计算图书新的评分
    let newRate = Math.round(rates.rateAvg)
    let bres = await mysql("book").where({ bid }).update({ rate: newRate })

    if (cres && bres) {
      ctx.state.data = {
        status: 0,
        msg: '评论成功'
      }
    } else {
      ctx.state.data = {
        status: -1,
        msg: '评论失败'
      }
    }

  }

  



}