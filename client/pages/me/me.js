// pages/me/me.js
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin: false,
    userInfo: {},
    userMoreInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户基本信息
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取用户更多信息
    wx.request({
      url: config.service.getUserMoreInfoUrl,
      method: 'get',
      data: {
        uid: this.data.userInfo.uid
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          userMoreInfo: data
        })
      }
    })
    wx.request({
      url: config.service.isAdminUrl,
      method: 'get',
      data: {
        uid: this.data.userInfo.uid
      },
      success: res => {
        console.log(res)
        if (res.data.code == 0 && res.data.data == "Admin") {
          this.setData({
            isAdmin: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  toVerifyPage: function(){
    if (this.data.userMoreInfo.isVerified == -1){
      // 待认证
      util.showModel("", "用户认证已提交，待审核")
    } else if (this.data.userMoreInfo.isVerified == 1) {
      // 已认证
      util.showModel("", "用户已认证") 
    } else {
      wx.navigateTo({
        url: '../verifyName/verifyName',
      })
    }
    
  },

  // 自定义组件 item 跳转事件
  navigateTo: function (e) {
    console.log(e.detail)
    wx.navigateTo({
      url: e.detail.url
    })
  }

})