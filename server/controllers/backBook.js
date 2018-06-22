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
  // 获取当前图书状态
  let book_status = await mysql("book").select('status').where({bid}).first()
  if (book_status.status == 0 || book_status.status == -1){
    ctx.state.data = {
      status: -1,
      msg: '图书未上架'
    }
  } else if(book_status.status == 2){
    ctx.state.data = {
      status: -1,
      msg: '回收图书请求待审核'
    }
  } else if (book_status.status == 3){
    ctx.state.data = {
      status: -1,
      msg: '图书已回收'
    }
  } else {
    let pres = await mysql("process").insert(process)
    let bres = await mysql("book").where({ bid }).update({ status })

    if (pres && bres) {
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
  
}

