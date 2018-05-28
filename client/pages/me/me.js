// pages/me/me.js
var config = require('../../config')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    money: 0,
    borrow: 0,
    share: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        money: app.globalData.userInfo.money
      })
    }
    wx.request({
      url: config.service.userBooksNumUrl,
      method: 'get',
      data: {
        uid: this.data.userInfo.uid
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          borrow: data.borrow,
          share: data.share
        })
      }
    })
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

  // toBorrowList: function () {
  //   wx.navigateTo({
  //     url: '../borrowBook/borrowBook',
  //   })
  // },
  toBorrowList: function () {
    wx.navigateTo({
      url: '../bookList/bookList?type=1',
    })
  },
  toShareList: function(){
    wx.navigateTo({
      url: '../bookList/bookList?type=0',
    })
  },
  // toShareBook: function(){
  //   wx.navigateTo({
  //     url: '../shareBook/shareBook',
  //   })
  // },

  toVerifyPage: function(){
    wx.navigateTo({
      url: '../verifyName/verifyName',
    })
  },

  toRecordList: function(){
    wx.navigateTo({
      url: '../bookList/bookList?type=2',
    })
  },

  toLikeList: function(){
    wx.navigateTo({
      url: '../bookList/bookList?type=3',
    })
  }
})