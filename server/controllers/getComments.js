const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let bid = ctx.query.bid ? ctx.query.bid : -1

  let comments = await mysql("comment").where({ bid })

  ctx.state.data = {
    comments: comments
  }

}