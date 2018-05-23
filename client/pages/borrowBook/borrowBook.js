// pages/borrowBook/borrowBook.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: 12,
    //返回的图书信息
    borrowlist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      // 获取借阅的书
      url: config.service.getBorrowBookUrl,
      method: 'get',
      //这里定义传递的参数
      data: {
        uid: this.data.user_id
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          borrowlist: data.borrowlist
        })
        console.log(data.borrowlist)
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

  /**
   * 跳转书本详情页
   */
  toDetails: function (e) {
    let bid = e.currentTarget.dataset.bid
    wx.navigateTo({
      url: '../bookDetails/bookDetails?bid=' + bid,
    })
  },

  toProcess: function (){
    wx.navigateTo({
      url: '../process/process',
    })
  }

})