const { mysql } = require('../qcloud')

// 图书审核不通过
module.exports = async ctx => {

  let bid = ctx.query.bid ? ctx.query.bid : -1

  let bres = await mysql("book").where({ bid }).update({status: -1})

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