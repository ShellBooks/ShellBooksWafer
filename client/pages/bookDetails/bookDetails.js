// pages/book_details/book_details.js
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图书详情
    book_details: {},
    // 图书评论
    comments: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bid)
    wx.request({
      url: config.service.getBookDetailsUrl,
      method: 'get',
      data: {
        bid: options.bid
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        let rate = data.rate
        let rateArray = []
        for(let i = 0; i < 5; ++i){
          if (i < rate) rateArray.push(true)
          else rateArray.push(false)
        }
        data.rate = rateArray
        this.setData({
          book_details: data
        })  
        // 动态设置页面标题
        wx.setNavigationBarTitle({
          title: this.data.book_details.bname
        })   
      }
    })
    wx.request({
      // 获取图书评论
      url: config.service.getCommentsUrl,
      method: 'get',
      data: {
        bid: options.bid
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        for(let item in data){
          // 处理评分
          let rate = data[item].rate
          let rateArray = []
          for(let i = 0; i < 5; ++i){
            if(i < rate) rateArray.push(true)
            else rateArray.push(false)
          }
          data[item].rate = rateArray
          // 处理时间格式
          data[item].date = data[item].date.replace("T", " ").replace(".000Z", "")
        }
        
        this.setData({
          comments: data
        })
        console.log(data)
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