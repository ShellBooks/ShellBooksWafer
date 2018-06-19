const { mysql } = require('../qcloud')

// 删除活动
module.exports = async ctx => {

  let bnid = ctx.query.bnid ? ctx.query.bnid : -1

  let bnres = await mysql("banner").where({ bnid }).del()

  if (bnres) {
    ctx.state.data = {
      status: 0,
      msg: '删除成功'
    }
  } else {
    ctx.state.data = {
      status: -1,
      msg: '删除失败'
    }
  }

}