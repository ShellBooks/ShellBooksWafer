const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.request.body.uid
  let bid = ctx.request.body.bid
  let status = ctx.request.body.status
  let type = ctx.request.body.type
  let date = ctx.request.body.date
  let info = ctx.request.body.info
  let shell = ctx.request.body.shell

  let process = {
    bid: bid,
    uid: uid,
    type: type,
    date: date,
    info: info
  }
  
  let pres = await mysql("process").insert(process)
  
  // 图书上架 发放贝壳
  let oldMoney = await mysql("user").where({ uid }).select('money').first()
  let newMoney = parseInt(shell) + oldMoney.money

  let ures = await mysql("user").where({ uid }).update({ money: newMoney })
  let bres = await mysql("book").where({ bid }).update({ status, shell })
  
  if (bres && pres) {
    ctx.state.data = "审核成功"
  } else {
    ctx.state.code = -1
    ctx.state.data = "审核失败"
  }

}

