const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let uid = ctx.query.uid ? ctx.query.uid : -1

  let likelist = await mysql.raw('SELECT `like`.bid, bname, author, image FROM `like`, book WHERE `like`.bid = book.bid AND `like`.uid = ?', [uid])

  ctx.state.data = {
    likelist: likelist[0]
  }

}