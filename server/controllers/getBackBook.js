const { mysql } = require('../qcloud')

module.exports = async ctx => {

  let process = {
    bid: ctx.query.bid,
    uid: ctx.query.uid,
    type: ctx.query.type,
    date: ctx.query.date,
    info: ctx.query.info,
  }
  let bid = ctx.query.bid
  let status = ctx.query.status

  let pres = await mysql("process").insert(process)
  let bres = await mysql("book").where({bid}).update({status})

  if(pres && bres){
    ctx.state.data = {
      status: 0,
      msg: '回收图书请求提交成功'
    }
  } else {
    ctx.state.data = {
      status: -1,
      msg: '回收图书请求提交失败'
    } 
  }
}

