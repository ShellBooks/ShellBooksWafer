const { mysql } = require('../qcloud')

// 借阅审核不通过
module.exports = async ctx => {

  let brid = ctx.query.brid ? ctx.query.brid : -1

  let bres = await mysql("borrow").where({ brid }).update({ status: -1 })

  if (bres) {
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