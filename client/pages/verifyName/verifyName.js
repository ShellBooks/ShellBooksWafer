// pages/verifyName/verifyName.js

var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schid: '',
    name: '',
    phone: '',
    cardimg: ''
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
              cardimg: res.data.imgUrl
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
      current: this.data.cardimg,
      urls: [this.data.cardimg]
    })
  },

  uploadVerify: function () {
    util.showBusy('正在上传')
    let uid
    if (app.globalData.userInfo) {
      uid = app.globalData.userInfo.uid
    }
   
    wx.request({
      url: config.service.uploadVerifyNameUrl,
      method: 'post',
      data: {
        schid: this.data.schid,
        name: this.data.name,
        phone: this.data.phone,
        cardimg: this.data.cardimg,
        uid: uid
      },
      success: res => {
        console.log(res)
        if (res.data.code == 0) {
          util.showSuccess('上传信息成功')
          wx.navigateBack({
            delta:1
          })
        } else {
          util.showModel('上传信息失败', res.data.error)
        }
      }
    })
  },

  inputSchid: function (e) {
    this.data.schid = e.detail.value
  },
  inputName: function (e) {
    this.data.name = e.detail.value
  },
  inputPhone: function (e) {
    this.data.phone = e.detail.value
  }

})