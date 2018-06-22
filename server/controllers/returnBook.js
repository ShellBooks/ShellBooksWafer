const { mysql } = require('../qcloud')

// 归还图书
module.exports = async ctx => {
  let uid = ctx.request.body.uid
  let bid = ctx.request.body.bid
  let brid = ctx.request.body.brid
  let status = ctx.request.body.status
  let type = ctx.request.body.type
  let date = ctx.request.body.date
  let info = ctx.request.body.info
  let shell = ctx.request.body.shell

  // 更新 borrow 
  let bres = await mysql("borrow").where({ brid }).update({ status })

  // 插入 process
  let pres = await mysql("process").insert({ uid, bid, brid, type, date, info })

  // 返还贝壳
  let oldMoney = await mysql("user").where({ uid }).select('money').first()
  let newMoney = oldMoney.money + parseInt(shell)
  let ures = await mysql("user").where({ uid }).update({ money: newMoney })

  if (bres && pres && ures) {
    ctx.state.data = "归还成功"
  } else {
    ctx.state.code = -1,
    ctx.state.data = "归还失败"
  }

}

