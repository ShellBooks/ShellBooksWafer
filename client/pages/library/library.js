// pages/library/library.js
var config = require('../../config')
// var util = require('../../utils/util.js')

var app = getApp()    

var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({  

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    toView: 'red',
    scrollLeft: 100,
    new_books: {},
    inputShowed: false,
    inputVal: "",
    recommendation: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 新书上架
    wx.request({
      url:config.service.getNewBooksUrl,
      method: 'get',
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          new_books: data
        })
      }
    })
    // 推荐列表
    wx.request({
      url: config.service.recommendUrl,
      method: 'get',
      data: {
        uid: 6
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          recommendation: data
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
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break;
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollLeft: this.data.scrollLeft + 10
    })
  },

  toDetails: function(e){
    let bid = e.currentTarget.dataset.bid
    wx.navigateTo({
      url: '../bookDetails/bookDetails?bid=' +  bid,
    })
  },

  navigateTo: function(e){
    console.log(e.detail)
    wx.navigateTo({
      url: e.detail.url
    })
  },

  searchBook: function(){
    if(!this.data.inputVal){
      // 如果搜素内容为空 不操作
      this.hideInput()
    } else {
      wx.navigateTo({
        url: '../searchResult/searchResult?query=' + this.data.inputVal,
      })
    }
  },

  // WEUI SearchBar
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }

})