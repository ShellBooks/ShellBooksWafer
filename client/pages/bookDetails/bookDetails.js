// pages/book_details/book_details.js
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图书 id
    bid: -1,
    // 图书详情
    book_details: {},
    // 图书评论
    comments: {},
    //收藏
    favourite: 0,
    //滚动条拖动显示线
    lineTag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid
      if (app.globalData.userInfo) {
        uid = app.globalData.userInfo.uid
      }
    this.setData({
      bid: options.bid
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
        if(rate > 0){
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
        // 动态设置页面标题
        wx.setNavigationBarTitle({
          title: this.data.book_details.bname
        })   
      }
    })
    wx.request({
      // 获取图书评论
      url: config.service.getCommentsUrl,
      method: 'get',
      data: {
        bid: this.data.bid
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        for(let item in data){
          // 处理评分
          let rate = data[item].rate
          let rateArray = []
          for(let i = 0; i < 5; ++i){
            if(i < rate) rateArray.push(true)
            else rateArray.push(false)
          }
          data[item].rate = rateArray
          // 处理时间格式
          data[item].date = util.formatTime(new Date(data[item].date))
        }
        this.setData({
          comments: data
        })
      }
    })

    wx.request({
      //获取收藏状态
      url: config.service.getLikeUrl,
      method: 'get',
      data: {
        uid: uid,
        bid: this.data.bid
      },
      success: res => {
        console.log(res)
        let favourite = res.data.data
        if(favourite != 0){
          this.setData({
            favourite: 1
          })
        }
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
  // 借阅图书
  borrowBook: function () {
    let uid
    if (app.globalData.userInfo) {
      uid = app.globalData.userInfo.uid
    }
    let date = util.formatTime(new Date())
    wx.request({
      url: config.service.borrowBookUrl,
      method: 'post',
      data: {
        uid: uid,        
        bid: this.data.bid,
        type: 1, // type = 1 借书 type = 0 分享
        date: date,
        info: '借书请求已提交',
        shell: this.data.book_details.shell
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        if(data.status == -1){
          util.showModel("", data.msg)
        } else {
          wx.navigateTo({
            url: '../process/process?bid=' + this.data.bid + '&type=' + 1 + '&brid=' + data.brid,
          })
        }
      }
    })
  },

  //收藏
  clickLike: function(){
    let uid
    if (app.globalData.userInfo) {
      uid = app.globalData.userInfo.uid
    }
    if(this.data.favourite == 0){
      //收藏该书
      this.setData({
        favourite: 1
      })
    }else{
      //取消收藏
      this.setData({
        favourite: 0
      })
    }
    wx.request({
      url: config.service.uploadLikeUrl,
      method: 'post',
      data: {
        uid: uid,
        bid: this.data.bid,
        favourite: this.data.favourite
      },
      success: res => {
        console.log(res)
      }
    })
    
  },

  scrollEvent: function(){
    this.setData({
      lineTag: 1
    })
  }
})