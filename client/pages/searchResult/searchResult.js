// pages/searchResult/searchResult.js
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: config.service.searchBookUrl,
      method: 'get',
      data: {
        query: options.query
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          res: data,
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

  toDetails: function(e){
    let bid = e.currentTarget.dataset.bid
    // 跳转到图书详情
    wx.navigateTo({
      url: '../bookDetails/bookDetails?bid=' + bid,
    })
  }
})