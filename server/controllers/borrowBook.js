const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let process = {
    uid: ctx.request.body.uid,
    bid: ctx.request.body.bid,
    type: ctx.request.body.type,
    date: ctx.request.body.date,
    info: ctx.request.body.info
  }
  let borrow = {
    uid: ctx.request.body.uid,
    bid: ctx.request.body.bid,
    status: 0
  }
  let uid = ctx.request.body.uid  
  let bid = ctx.request.body.bid
  let shell = ctx.request.body.shell
  
  // 查询图书是否被借出
  // status 
  // 0 默认 借书请求
  // 1 借书
  // 2 还书
  let isBorrowed = await mysql("borrow").where({ bid }).select('status').orderBy('brid', 'desc').first()

  if(isBorrowed && isBorrowed.status != 2){
    // 该书被借出
    ctx.state.data = {
      msg: "该书被借出，先收藏起来吧~",
      status: -1
    }
  } else {
    // 扣除贝壳
    let oldMoney = await mysql("user").where({ uid }).select('money').first()
    let newMoney = oldMoney.money - parseInt(shell)

    if( newMoney < 0){
      // 余额不足
      ctx.state.data = {
        msg: "余额不足",
        status: -1
      }
    } else {
      let ures = await mysql("user").where({ uid }).update({ money: newMoney })
      let bres = await mysql("borrow").insert(borrow)
      process.brid = bres
      let pres = await mysql("process").insert(process)

      if (pres && bres && ures) {
        ctx.state.data = {
          status: 0,
          brid: bres,
          msg: '借书成功'
        }
      } else {
        ctx.state.data = {
          status: -1,
          msg: '借书失败'
        }
      }

    }
  }

  

}

