const { mysql } = require('../qcloud')

// 管理员通过借书请求
module.exports = async ctx => {
  let uid = ctx.request.body.uid
  let bid = ctx.request.body.bid
  let borrow_date = ctx.request.body.borrow_date
  let return_date = ctx.request.body.return_date
  let status = ctx.request.body.status
  let type = ctx.request.body.type
  let date = ctx.request.body.date
  let info = ctx.request.body.info
  let shell = ctx.request.body.shell

  // 更新 borrow 
  let bres = await mysql("borrow").where({uid, bid}).update({borrow_date, return_date, status})

  // 插入 process
  let pres = await mysql("process").insert({uid, bid, type, date, info})

  // 扣除贝壳
  let oldMoney = await mysql("user").where({ uid }).select('money').first()
  let newMoney = oldMoney.money - parseInt(shell)
  let ures = await mysql("user").where({ uid }).update({money: newMoney})

  if(bres && pres && ures){
    ctx.state.data = "借阅成功"
  } else {
    ctx.state.code = -1,
    ctx.state.data = "借阅失败"
  }

}

