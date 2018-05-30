/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://6ladjykl.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 获取用户信息
        userInfoUrl: `${host}/weapp/userInfo`,

        // 获取用户借阅分享图书数
        userBooksNumUrl: `${host}/weapp/userBooksNum`,

        // 获取图书评论
        getCommentsUrl: `${host}/weapp/getComments`,

        // 获取借阅的书
        getBorrowBookUrl: `${host}/weapp/getBorrowBook`,

        // 获取图书详情
        getBookDetailsUrl: `${host}/weapp/getBookDetails`,

        // 获取新书上架
        getNewBooksUrl: `${host}/weapp/getNewBooks`,

        // 上传图书信息
        uploadBookInfoUrl: `${host}/weapp/uploadBookInfo`,

        // 获取分享图书列表
        getShareBookUrl: `${host}/weapp/getShareBook`,

        // 借阅图书
        borrowBookUrl: `${host}/weapp/borrowBook`,

        // 获取流程信息
        getProcessUrl: `${host}/weapp/getProcess`,

        //上传实名认证
        uploadVerifyNameUrl: `${host}/weapp/uploadVerifyName`,

        // 搜索图书
        searchBookUrl: `${host}/weapp/searchBook`,

        //上传评论
        uploadCommentUrl: `${host}/weapp/uploadComment`,

        // 推荐图书
        recommendUrl: `${host}/weapp/recommend`,

        // 显示收藏
        getLikeBookUrl: `${host}/weapp/getLikeBook`,

        // 判断是否为管理员
        isAdminUrl: `${host}/weapp/isAdmin`,

        // 管理员用户审核
        usersReadyForVerifyUrl: `${host}/weapp/usersReadyForVerify`,

        // 管理员通过用户审核
        passUserVerifyUrl: `${host}/weapp/passUserVerify`,

        // 管理员审核图书
        booksReadyForVerifyUrl: `${host}/weapp/booksReadyForVerify`,

        // 管理员通过图书审核
        passBookVerifyUrl: `${host}/weapp/passBookVerify`,

        // 管理员管理借书请求
        manageBorrowUrl: `${host}/weapp/manageBorrow`,

        // 收藏图书
        uploadLikeUrl: `${host}/weapp/uploadLike`,
    }
};

module.exports = config;
