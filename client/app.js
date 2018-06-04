//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
    // 用户登陆

    if (this.globalData.logged) return
    util.showBusy('正在登录')
    var that = this
    qcloud.login({
      success(result) {
        // login 接口 result 无 open_id 信息，直接使用用户信息接口获取信息
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            util.showSuccess('登录成功')
            let data = result.data.data
            wx.request({
              url: config.service.userInfoUrl,
              method: 'get',
              data: {
                openId: data.openId,
                avatarUrl: data.avatarUrl,
                gender: data.gender,
                nickName: data.nickName
              },
              success: res => {
                console.log(res.data)
                that.globalData.userInfo = res.data.data.userInfo
                that.globalData.logged = true
              }
            })
          },
          fail(error) {
            util.showModel('请求失败', error)
            console.log('request fail', error)
          }
        })
      },
      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  globalData: {
    userInfo: {},
    logged: false,
  }
})