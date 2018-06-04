const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  let userMoreInfo = await mysql("user").where({ uid }).select('name', 'schid', 'phone', 'money', 'credit', 'isVerified').first()

  let share = await mysql("book").where({ uid })
  let borrow = await mysql("borrow").where({ uid })

  userMoreInfo.share = share.length
  userMoreInfo.borrow = borrow.length

  ctx.state.data = userMoreInfo

}