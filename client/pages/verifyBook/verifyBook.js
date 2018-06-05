// pages/verifyBook/verifyBook.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shell: 0,
    // realBooks: [],
    booksInfo: []
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
      url: config.service.booksReadyForVerifyUrl,
      method: 'get',
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          booksInfo: data.booksInfo
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

  // 审核图书 
  passVerify: function(e){
    let data = {}
    data.uid = e.currentTarget.dataset.uid
    data.bid = e.currentTarget.dataset.bid
    data.status = e.currentTarget.dataset.status
    data.type = 0 // type = 0 图书分享
    data.date = util.formatTime(new Date())
    data.info = "图书审核成功并上架,你将获取" + this.data.shell + "个贝壳，请查收"
    data.shell = this.data.shell
    wx.request({
      url: config.service.passBookVerifyUrl,
      method: 'post',
      data: data,
      success: res => {
        console.log(res)
        if (res.data.code == 0) {
          util.showSuccess(res.data.data)
          wx.redirectTo({
            url: 'verifyBook',
          })
        } else if (res.data.code == -1) {
          util.showModel("审核失败", res.data.data)
        }
      }
    })
  },
  // 输入贝壳数 
  inputShell: function(e){
    this.data.shell = e.detail.value
  }
})