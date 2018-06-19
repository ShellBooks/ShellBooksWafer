// pages/process/process.js
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    // 图书 id
    bid: -1,
    brid: null,
    // 图书详情
    book_details: {},
    process: [],
    lineTag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bid: options.bid,
      type: options.type
    })
    if(options.brid){
      this.setData({
        brid: options.brid,
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
    let uid
    if (app.globalData.userInfo) {
      uid = app.globalData.userInfo.uid
    }
    let type
    if (this.data.type == 1 || this.data.type == 2) {
      type = 1
    } else {
      type = 0
    }
    let data = {
      bid: this.data.bid,
      uid: uid,
      type: type
    }
    if(this.data.brid){
      data.brid = this.data.brid
    }
    console.log(data)
    wx.request({
      url: config.service.getProcessUrl,
      method: 'get',
      data: data,
      success: res => {
        console.log(res)
        let data = res.data.data
        for (let i in data) {
          // 处理 data 拆分成 day + time
          let date = util.formatTime(new Date(data[i].date))
          console.log(date)
          let arr = date.split(" ")
          data[i].day = arr[0]
          data[i].time = arr[1]
        }
        this.setData({
          process: data
        })
      }
    })
    if (this.data.type == 1 || this.data.type == 2) {
      wx.request({
        url: config.service.getBorrowDetailsUrl,
        method: 'get',
        data: {
          uid: uid,
          bid: this.data.bid,
          type: this.data.type
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
          if (data.borrow_date == null && data.return_date == null) {
            data.borrow_date = '暂无信息'
            data.return_date = '暂无信息'
          } else {
            data.borrow_date = util.formatTime(new Date(data.borrow_date), 1)
            data.return_date = util.formatTime(new Date(data.return_date), 1)
          }
          this.setData({
            book_details: data
          })
        }
      })
    } else if (this.data.type == 0) {
      // 我的分享
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
    }
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
      url: '../bookReviews/bookReviews?bid=' + bid
    })
  },
  getBackBook: function () {
    let date = util.formatTime(new Date())
    wx.request({
      url: config.service.backBookUrl,
      method: 'get',
      data: {
        bid: this.data.bid,
        uid: app.globalData.userInfo.uid,
        type: 0,
        date: date,
        info: '回收图书请求已提交，请待图书闲置后到管理员处取回图书',
        status: 2
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        if (data.status == 0) {
          util.showSuccess(data.msg)
        } else {
          util.showModel("", data.msg)
        }
      }
    })
  },
  scrollEvent: function () {
    this.setData({
      lineTag: 1
    })
  }
})