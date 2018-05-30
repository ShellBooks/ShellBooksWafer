// pages/manageBorrow/manageBorrow.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrowBook: [],
    returnBook: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  // 通过借阅请求 扣除相应贝壳
  passBorrow: function(e){
    // 30 天毫秒数
    const oneMonth = 2592000000
    let uid = e.currentTarget.dataset.uid
    let bid = e.currentTarget.dataset.bid
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
        borrow_date: borrow_date,
        return_date: return_date,
        status: 1,
        type: 1,
        date: date,
        info: '借书成功，贝壳已扣除。请在规定日期前将图书归还',
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
          util.showModel("借阅失败", res.data.data)
        }
      }
    })
  },
  // 归还图书
  returnBook: function(e){
    let uid = e.currentTarget.dataset.uid
    let bid = e.currentTarget.dataset.bid
    let shell = e.currentTarget.dataset.shell
    let date = util.formatTime(new Date())
    wx.request({
      url: config.service.returnBookUrl,
      method: 'post',
      data: {
        bid: bid,
        uid: uid,
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
    
  }
})