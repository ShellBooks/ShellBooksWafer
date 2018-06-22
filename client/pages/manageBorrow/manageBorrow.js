// pages/manageBorrow/manageBorrow.js
var config = require('../../config')
var util = require('../../utils/util.js')

var sliderWidth = 30; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrowBook: [],
    returnBook: [],
    tabs: ["图书借阅", "图书归还"],
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
    wx.request({
      url: config.service.manageBorrowUrl,
      method: 'get',
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          borrowBook: data.borrowBook,
          returnBook: data.returnBook
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

  // 通过借阅请求 扣除相应贝壳
  passBorrow: function(e){
    // 30 天毫秒数
    const oneMonth = 2592000000
    let uid = e.currentTarget.dataset.uid
    let bid = e.currentTarget.dataset.bid
    let brid = e.currentTarget.dataset.brid
    let status = e.currentTarget.dataset.status
    let shell = e.currentTarget.dataset.shell
    let borrow_date = util.formatTime(new Date(), 1)
    let ms = (new Date()).getTime() + oneMonth
    let return_date = util.formatTime(new Date(ms), 1)
    let date = util.formatTime(new Date())
    wx.request({
      url: config.service.passBorrowUrl,
      method: 'post',
      data:{
        uid: uid,
        bid: bid,
        brid: brid,
        borrow_date: borrow_date,
        return_date: return_date,
        status: 1,
        type: 1,
        date: date,
        info: '借书成功并扣除相应贝壳，请在规定日期前将图书归还'
      },
      success: res => {
        console.log(res)
        if (res.data.code == 0) {
          util.showSuccess(res.data.data)
          wx.redirectTo({
            url: 'manageBorrow',
          })
        } else if (res.data.code == -1) {
          util.showModel("借阅失败", res.data.data)
        }
      }
    })
  },
  // 归还图书
  returnBook: function(e){
    let uid = e.currentTarget.dataset.uid
    let bid = e.currentTarget.dataset.bid
    let brid = e.currentTarget.dataset.brid
    let shell = e.currentTarget.dataset.shell
    let date = util.formatTime(new Date())
    wx.request({
      url: config.service.returnBookUrl,
      method: 'post',
      data: {
        bid: bid,
        uid: uid,
        brid: brid,
        status: 2,
        type: 1,
        date: date,
        info: '图书归还，请查收返还贝壳',
        shell: shell
      },
      success: res => {
        console.log(res)
        if (res.data.code == 0) {
          util.showSuccess(res.data.data)
          wx.redirectTo({
            url: 'manageBorrow',
          })
        } else if (res.data.code == -1) {
          util.showModel("归还失败", res.data.data)
        }
      }
    })
    
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  notPassBorrow: function(e){
    let date = util.formatTime(new Date)
    let data = {
      brid: e.currentTarget.dataset.brid,
      bid: e.currentTarget.dataset.bid,
      uid: e.currentTarget.dataset.uid,
      shell: e.currentTarget.dataset.shell,
      type: 1,
      date: date,
      info: '您的借书请求被拒绝，贝壳已返还'
    }
    wx.request({
      url: config.service.notPassBorrowUrl,
      method: 'post',
      data: data,
      success: res => {
        console.log(res)
        wx.redirectTo({
          url: 'manageBorrow',
        })
      }
    })
  }
})