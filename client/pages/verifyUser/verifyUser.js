// pages/verifyUser/verifyUser.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.request({
      url: config.service.usersReadyForVerifyUrl,
      method: 'get',
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          users: data
        })

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

  passInfoVerify: function(e){
    let uid = e.currentTarget.dataset.uid
    wx.request({
      url: config.service.passUserVerifyUrl,
      method: 'post',
      data: {
        isVerified: 1,
        uid: uid
      },
      success: res => {
        console.log(res)
        if(res.data.code == 0){
          util.showSuccess(res.data.data)
          wx.redirectTo({
            url: 'verifyUser',
          })
        } else if(res.data.code == -1){
          util.showModel(res.data.data)
        }
      }
    })
  },
  // 用户审核不通过
  notPassUser: function(e){
    let uid = e.currentTarget.dataset.uid
    wx.request({
      url: config.service.notPassUserUrl,
      method: 'get',
      data:{
        uid: uid
      },
      success: res => {
        console.log(res)
        wx.redirectTo({
          url: 'verifyUser',
        })
      }
    })
  }
})