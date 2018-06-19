// pages/verifyBook/verifyBook.js
var config = require('../../config')
var util = require('../../utils/util.js')

var sliderWidth = 30; // 需要设置slider的宽度，用于计算中间位置

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shell: null,
    booksInfo: [],
    backBooks: [],
    tabs: ["图书审核", "图书回收"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    // 图书审核
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
    // 图书回收
    let data 
    wx.request({
      url: config.service.getBackBookUrl,
      method: 'get',
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          backBooks: data
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
    if(this.data.shell == null){
      util.showModel("", "请输入贝壳数")
      return
    }
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
  // 通过回收请求
  passBack: function(e){
    let data = {}
    data.uid = e.currentTarget.dataset.uid
    data.bid = e.currentTarget.dataset.bid
    data.status = e.currentTarget.dataset.status
    data.shell = e.currentTarget.dataset.shell
    data.type = 0 
    data.date = util.formatTime(new Date())
    data.info = "图书回收成功，扣除相应贝壳"
    wx.request({
      url: config.service.passBackBookUrl,
      method: 'post',
      data: data,
      success: res => {
        console.log(res)
        let data = res.data.data
        if(data.status == 0){
          util.showSuccess(data.msg)
          wx.redirectTo({
            url: 'verifyBook',
          })
        } else {
          util.showModel("", data.msg)
        }
      }
    })
  },
  // 输入贝壳数 
  inputShell: function(e){
    this.data.shell = e.detail.value
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  // 图书审核不通过
  notPassBook: function(e){
    let date = util.formatTime(new Date)
    let data = {
      uid: e.currentTarget.dataset.uid,
      bid: e.currentTarget.dataset.bid,
      type: 0,
      date: date,
      info: '图书审核未通过'
    }
    wx.request({
      url: config.service.notPassBookUrl,
      method: 'post',
      data: data,
      success: res => {
        console.log(res)
        wx.redirectTo({
          url: 'verifyBook',
        })
      }
    })
  }
})