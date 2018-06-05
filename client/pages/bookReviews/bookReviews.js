// pages/bookReviews/bookReviews.js
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bid: '',
    rate: null,
    content: '',
    rate: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过传入options来获取bid
    //一开始设定rate是0
    this.setData({
      bid: options.bid,
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

  postReview: function(){
    util.showBusy('正在上传')
    //获取用户id（uid）
    let uid
    if (app.globalData.userInfo) {
      uid = app.globalData.userInfo.uid
    }
    //获取书本id（bid）
    //let bid = this.bid

    //获取当前时间
    let date = util.formatTime(new Date())
  
    wx.request({
      //获取评论后台路径
      url: config.service.uploadCommentUrl,
      method: 'post',
      data: {
        uid: uid,
        bid: this.data.bid,
        date: date,
        rate: this.data.rate,
        content: this.data.content
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        if (data.status == 0) {
          util.showSuccess('评论成功')
          wx.navigateBack({
            delta:1
          })
        } else {
          util.showModel('', data.msg)
        }
      }
    })
  },

  //获取输入框中的内容
  inputReview: function(e){
    this.data.content = e.detail.value;
  },

  //点击星星事件1
  clickStarOne: function(){
    this.setData({
      rate: 1
    })
  },

  //点击星星事件2
  clickStarTwo: function () {
    this.setData({
      rate: 2
    })
  },

  //点击星星事件3
  clickStarThree: function () {
    this.setData({
      rate: 3
    })
  },

  //点击星星事件4
  clickStarFour: function () {
    this.setData({
      rate: 4
    })
  },

  //点击星星事件5
  clickStarFive: function () {
    this.setData({
      rate: 5
    })
  },
})