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
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过传入options来获取bid
    this.setData({
      bid: options.bid
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
    console.log(this.data.content)
  
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
        if (res.data.code == 0) {
          util.showSuccess('上传信息成功')
          //let bid = res.data.data
          // wx.redirectTo({
          //   url: '../process/process?bid=' + bid + '&type=' + 2,
          // })
        } else {
          util.showModel('上传信息失败', res.data.error)
        }
      }
    })
  },

  //获取输入框中的内容
  inputReview: function(e){
    this.data.content = e.detail.value;
  }
})