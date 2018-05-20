// pages/book_details/book_details.js
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面标题
    title: '图书详情', 
    // 图书id
    book_id: 6,
    // 图书评论
    comments: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.title
    })  
    wx.request({
      // 获取图书评论
      url: config.service.getCommentsUrl,
      method: 'get',
      data: {
        bid: this.data.book_id
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          comments: data.comments
        })
        console.log(data.comments)
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

  }
})