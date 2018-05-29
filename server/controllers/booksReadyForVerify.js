const { mysql } = require('../qcloud')

module.exports = async ctx => {

  // status
  // 0 信息上传 待审核
  // 1 信息审核通过 待收到实体书
  // 2 实体书审核通过 发放贝壳 图书上架待借阅
  // 3 图书被借阅
  // 4 图书冻结待回收
  let realBooks = await mysql("book").where({ status: 1 })
  let booksInfo = await mysql("book").where({ status: 0 })

  ctx.state.data = {
    realBooks: realBooks,
    booksInfo: booksInfo
  }


}