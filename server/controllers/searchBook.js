const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let query = ctx.query.query ? ctx.query.query : ''
  query = '%' + query + '%'

  let res = await mysql("book").whereRaw('status = 1 AND bname LIKE ? OR status = 1 AND author LIKE ?', [query, query])

  ctx.state.data = res

}

