// pages/library/library.js
var config = require('../../config')

var app = getApp()    

Page({  

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框参数
    inputShowed: false,
    inputVal: "",
    new_books: [],
    recommendation: [],
    banner:[]
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
      url: config.service.getBannerUrl,
      method: 'get',
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          banner: data
        })
      }
    })
    // 新书上架
    wx.request({
      url: config.service.getNewBooksUrl,
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
    let uid = app.globalData.userInfo.uid
    console.log(uid)
    wx.request({
      url: config.service.recommendUrl,
      method: 'get',
      data: {
        uid: uid
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
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
})