const { mysql } = require('../qcloud')

// 图书审核不通过
module.exports = async ctx => {

  let process = {
    bid: ctx.request.body.bid,
    uid: ctx.request.body.uid,
    type: ctx.request.body.type,
    date: ctx.request.body.date,
    info: ctx.request.body.info
  }
  let bid = ctx.request.body.bid

  let pres = await mysql("process").insert(process)
  let bres = await mysql("book").where({ bid }).update({status: -1})

  if (bres && pres) {
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