// pages/process/process.js
var config = require('../../config')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    // 图书 id
    bid: -1,
    // 图书详情
    book_details: {},
    process: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bid: options.bid,
      type: options.type
    })
    let uid
    if (app.globalData.userInfo) {
      uid = app.globalData.userInfo.uid
    }
    wx.request({
      url: config.service.getProcessUrl,
      method: 'get',
      data:{
        bid: this.data.bid,
        uid: uid,
        type: this.data.type
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        for(let i in data){
          // 处理 data 拆分成 day + time
          let date = data[i].date.replace("T", " ").replace(".000Z","")
          let arr = date.split(" ")
          data[i].day = arr[0]
          data[i].time = arr[1]
        }
        console.log(data)
        this.setData({
          process: data
        })
      }
    })
    wx.request({
      url: config.service.getBookDetailsUrl,
      method: 'get',
      data: {
        bid: this.data.bid
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        let rate = data.rate
        if (rate > 0) {
          let rateArray = []
          for (let i = 0; i < 5; ++i) {
            if (i < rate) rateArray.push(true)
            else rateArray.push(false)
          }
          data.rate = rateArray
        }
        this.setData({
          book_details: data
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

  //跳转到评论页面
  toReview: function () {
    let bid = this.data.bid
    let uid = app.globalData.userInfo.uid
    wx.navigateTo({
      url: '../bookReviews/bookReviews?bid=' +bid
    })
  }
})