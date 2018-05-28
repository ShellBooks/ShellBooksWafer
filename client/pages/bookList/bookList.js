// pages/bookList/bookList.js
var config = require('../../config')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    //返回的图书信息
    booklist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid    
    if (app.globalData.userInfo) {
      // 获取用户 uid
      uid = app.globalData.userInfo.uid
    }
    this.setData({
      type: options.type
    })
    // type = 1 借书
    if(this.data.type == 1){
      wx.setNavigationBarTitle({
        title: '当前借书'
      })   
      wx.request({
        // 获取借阅的书
        url: config.service.getBorrowBookUrl,
        method: 'get',
        //这里定义传递的参数
        data: {
          uid: uid
        },
        success: res => {
          //console.log(res)
          let data = res.data.data
          this.setData({
            booklist: data.borrowlist
          })
          console.log(data.borrowlist)
        }
      })
    } else if (this.data.type == 0){
      // type = 0 分享
      wx.setNavigationBarTitle({
        title: '我的分享'
      })   
      wx.request({
        // 获取分享的书
        url: config.service.getShareBookUrl,
        method: 'get',
        data: {
          uid: uid
        },
        success: res => {
          console.log(res)
          let data = res.data.data
          this.setData({
            booklist: data
          })
        }
      })
    } else if (this.data.type == 2) {
      // type = 2 借阅记录
      //注意！！！！借阅记录中使用的后台和borrow一样，因为还没有做分类
      wx.setNavigationBarTitle({
        title: '借阅记录'
      })
      wx.request({
        // 获取借阅的书
        url: config.service.getBorrowBookUrl,
        method: 'get',
        //这里定义传递的参数
        data: {
          uid: uid
        },
        success: res => {
          //console.log(res)
          let data = res.data.data
          this.setData({
            booklist: data.borrowlist
          })
          console.log(data.borrowlist)
        }
      })
    } else if (this.data.type == 3) {
      // type = 3 收藏
      wx.setNavigationBarTitle({
        title: '我的收藏'
      })
      wx.request({
        // 获取收藏的书
        url: config.service.getLikeBookUrl,
        method: 'get',
        data: {
          uid: uid
        },
        success: res => {
          console.log(res)
          let data = res.data.data
          if(data.likelist){
            this.setData({
              booklist: data.likelist
            })
          }
          else{
            console.log('have some problem')
          }
          
          console.log(data.likelist)
        }
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

  toProcess: function (e) {
    let bid = e.currentTarget.dataset.bid
    wx.navigateTo({
      url: '../process/process?bid=' + bid + '&type=' + this.data.type,
    })
  }
})