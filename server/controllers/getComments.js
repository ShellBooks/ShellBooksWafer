const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let bid = ctx.query.bid ? ctx.query.bid : -1

  let comments = await mysql.raw('SELECT avatar_url, nickname, date, rate, content FROM comment, user WHERE comment.uid = user.uid AND bid = ? ORDER BY date DESC', [bid])

  ctx.state.data = comments[0]

}

