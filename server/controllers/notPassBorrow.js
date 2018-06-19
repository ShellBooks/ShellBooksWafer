const { mysql } = require('../qcloud')

// 借阅审核不通过
module.exports = async ctx => {

  let process = {
    brid: ctx.request.body.brid,
    bid: ctx.request.body.bid,
    uid: ctx.request.body.uid,
    type: ctx.request.body.type,
    date: ctx.request.body.date,
    info: ctx.request.body.info
  }

  let brid = ctx.request.body.brid 

  let pres = await mysql("process").insert(process)
  let bres = await mysql("borrow").where({ brid }).update({ status: -1 })

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