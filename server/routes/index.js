/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// ----------------------------------------------

// GET 获取用户基本信息
router.get('/userInfo', controllers.userInfo)

// GET 获取用户更多信息
router.get('/getUserMoreInfo', controllers.getUserMoreInfo)

// GET 获取图书评论
router.get('/getComments', controllers.getComments)

// GET 获取借书信息
router.get('/getBorrowBook', controllers.getBorrowBook)

// GET 获取图书详情
router.get('/getBookDetails', controllers.getBookDetails)

// GET 获取新书上架
router.get('/getNewBooks', controllers.getNewBooks)

// POST 上传图书信息
router.post('/uploadBookInfo', controllers.uploadBookInfo)

// GET 获取分享图书列表
router.get('/getShareBook', controllers.getShareBook)

// GET 借阅图书
router.post('/borrowBook', controllers.borrowBook)

// GET 获取流程信息
router.get('/getProcess', controllers.getProcess)

// POST 上传实名认证
router.post('/uploadVerifyName', controllers.uploadVerifyName)

// GET 搜索图书
router.get('/searchBook', controllers.searchBook)

// POST 上传评论
router.post('/uploadComment', controllers.uploadComment)

// GET 图书推荐
router.get('/recommend', controllers.recommend)

// GET 判断是否为管理员
router.get('/isAdmin', controllers.isAdmin)

// GET 管理员用户审核
router.get('/usersReadyForVerify', controllers.usersReadyForVerify)

// POST 管理员通过用户审核
router.post('/passUserVerify', controllers.passUserVerify)

//GET 图书收藏
router.get('/getLikeBook', controllers.getLikeBook)

// GET 管理员审核图书
router.get('/booksReadyForVerify', controllers.booksReadyForVerify)

// POST 管理员通过图书审核
router.post('/passBookVerify', controllers.passBookVerify)

// GET 管理员管理借书请求
router.get('/manageBorrow', controllers.manageBorrow)

// POST 收藏
router.post('/uploadLike', controllers.uploadLike)

// POST 管理员通过借书请求
router.post('/passBorrow', controllers.passBorrow)

// POST 管理员返还图书
router.post('/returnBook', controllers.returnBook)

// GET 获取收藏状态
router.get('/getLike', controllers.getLike)

// POST 上传活动
router.post('/uploadAct', controllers.uploadAct)

// GET 获取活动
router.get('/getBanner', controllers.getBanner)

// GET 获取借阅详情
router.get('/getBorrowDetails', controllers.getBorrowDetails)

// GET 回收图书请求
router.get('/backBook', controllers.backBook)

// GET 获取回收图书请求
router.get('/getBackBook', controllers.getBackBook)

// POST 通过图书回收
router.post('/passBackBook', controllers.passBackBook)

// GET 用户审核不通过
router.get('/notPassUser', controllers.notPassUser)

// GET 图书审核不通过
router.post('/notPassBook', controllers.notPassBook)

// POST 借阅审核不通过
router.post('/notPassBorrow', controllers.notPassBorrow)

// GET 删除活动
router.get('/deleteAct', controllers.deleteAct)


module.exports = router
