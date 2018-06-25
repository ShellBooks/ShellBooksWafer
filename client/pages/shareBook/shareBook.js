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
    image: ''
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
  // 豆瓣API获取图书信息
  doubanBookInfo: function(e){
    // let ISBN = this.data.ISBN
    // wx.request({
    //   url: 'https://douban.uieee.com/v2/book/isbn/' + ISBN,
    //   header: {
    //     "Content-Type": "json"
    //   },
    //   method: 'get',
    //   success: res => {
    //     console.log(res)
    //     let author = res.data.author
    //     let image = res.data.image
    //     let price = res.data.price.replace("元", "").replace("CNY ", "")
    //     let publish = res.data.publisher
    //     let bname = res.data.title
    //     this.setData({
    //       bname: bname,
    //       author: author,
    //       publish: publish,
    //       price: price,
    //       image: image,
    //       ISBN: ISBN
    //     })
    //   }
    // })
    wx.scanCode({
      success: res => {
        console.log(res.result)
        let ISBN = res.result
        wx.request({
          url: 'https://douban.uieee.com/v2/book/isbn/' + ISBN,
          header: {
            "Content-Type": "json"
          },
          method: 'get',
          success: res => {
            console.log(res)
            let author = res.data.author
            let image = res.data.image
            let price = res.data.price.replace("元", "").replace("CNY ","")
            let publish = res.data.publisher
            let bname = res.data.title
            this.setData({
              bname: bname,
              author: author,
              publish: publish,
              price: price,
              image: image,
              ISBN: ISBN
            })
          }
        })
      }
    })
    
  },
  uploadBookInfo: function(){
    util.showBusy('正在上传')
    let uid
    if (app.globalData.userInfo) {
      uid = app.globalData.userInfo.uid
    }
    let date = util.formatTime(new Date())
    // 提交实体书期限 
    // 259200000 为三天的毫秒数
    const threeDays = 259200000
    let ms = (new Date()).getTime() + threeDays
    let limit = util.formatTime(new Date(ms))
    wx.request({
      url: config.service.uploadBookInfoUrl,
      method: 'post',
      data: {
        bname: this.data.bname,
        author: this.data.author,
        publish: this.data.publish,
        price: this.data.price,
        ISBN: this.data.ISBN,
        image: this.data.image,
        rate: 0,
        status: 0,
        date: date,
        uid: uid,
        info: '图书信息已提交，请于' + limit + '前将图书提交给管理员'
      },
      success: res => {
        console.log(res)
        if(res.data.code == 0){
          util.showSuccess('上传信息成功')
          let bid = res.data.data
          wx.redirectTo({
            url: '../process/process?bid=' + bid + '&type=' + 0,
          })
        } else {
          util.showModel('上传信息失败', res.data.error)
        }
      }
    })
  },

  inputName: function (e) {
    this.data.bname = e.detail.value
  },
  inputAuthor: function(e){
    this.data.author = e.detail.value.replace(",", " ")
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