const { mysql } = require('../qcloud')

module.exports = async ctx => {

  // status
  // 0 信息上传 待审核
  // 1 实体书审核通过 发放贝壳 图书上架待借阅
  // 2 图书冻结待回收
  // 3 图书已回收
  let booksInfo = await mysql("book").where({ status: 0 })

  ctx.state.data = {
    booksInfo: booksInfo
  }

}