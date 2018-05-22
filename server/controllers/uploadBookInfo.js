const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // POST 请求 获取 data
  let book = ctx.request.body

  let res = await mysql("book").insert(book)

  if(res){
    ctx.state.data = "upload success"
  } else {
    ctx.state.code = -1
    ctx.state.date = "upload error"
  }
  

}

