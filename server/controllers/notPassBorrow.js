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
  let uid = ctx.request.body.uid
  let shell = ctx.request.body.shell

  let pres = await mysql("process").insert(process)
  // status => 2 还书  未借出
  let bres = await mysql("borrow").where({ brid }).update({ status: 2 })

  let oldMoney = await mysql("user").where({uid}).select("money").first()
  let newMoney = parseInt(shell) + oldMoney.money
  let ures = await mysql("user").where({uid}).update({money: newMoney})

  if (bres && pres && ures) {
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