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

  // 图书回收扣除贝壳
  let oldMoney = await mysql("user").where({ uid }).select('money').first()
  let newMoney = oldMoney.money - parseInt(shell)  
  let ures = await mysql("user").where({ uid }).update({ money: newMoney })

  // 更新图书状态 status = 4
  let bres = await mysql("book").where({ bid }).update({ status })

  if (bres && pres && ures) {
    ctx.state.data = {
      status: 0,
      msg: '回收图书成功'
    }
  } else {
    ctx.state.data = {
      status: -1,
      msg: '回收图书失败'
    }
  }

}

