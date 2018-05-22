// pages/shareBook/shareBook.js
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bname: '',
    author: '',
    publish: '',
    price: '',
    ISBN: '',
    image: '',
    rate: 0,
    status: 0
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

  // 上传图片接口
  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              image: res.data.imgUrl
            })
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.image,
      urls: [this.data.image]
    })
  },

  doubanBookInfo: function(e){
    // console.log(e)
    // wx.request({
    //   url: 'https://api.douban.com/v2/book/isbn/:' + this.data.isbn,
    //   header: {
    //     "Content-Type": "json"
    //   },
    //   method: 'get',
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  },
  uploadBookInfo: function(){
    util.showBusy('正在上传')
    // 为 Date 对象添加原型
    Date.prototype.Format = function (fmt) { //author: meizz 
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }

    let book = this.data
    if (app.globalData.userInfo) {
      book.uid = app.globalData.userInfo.uid
    }
    let date = new Date().Format("yyyy-MM-dd hh:mm:ss")
    console.log(date)
    book.date = date
    console.log(book)
    wx.request({
      url: config.service.uploadBookInfoUrl,
      method: 'post',
      data: book,
      success: res => {
        console.log(res)
        if(!res.code){
          util.showSuccess('上传信息成功')
        } else {
          util.showModel('上传信息失败')
        }
      }
    })

    
  },

  inputName: function (e) {
    this.data.bname = e.detail.value
  },
  inputAuthor: function(e){
    this.data.author = e.detail.value
  },
  inputPublish: function (e) {
    this.data.publish = e.detail.value
  },
  inputPrice: function (e) {
    this.data.price = e.detail.value
  },
  inputISBN: function (e) {
    this.data.ISBN = e.detail.value
  },
})