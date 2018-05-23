const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let process = ctx.request.body
  let borrow = {
    uid: process.uid,
    bid: process.bid,
    status: 0
  }
  
  let pres = await mysql("process").insert(process)
  let bres = await mysql("borrow").insert(borrow)

  if(pres && bres){
    ctx.state.data = "borrow success"
  } else {
    ctx.state.code = -1
    ctx.state.data = "borrow error"
  }

}

