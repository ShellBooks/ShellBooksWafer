// pages/uploadAct/uploadAct.js
var config = require('../../config')
var util = require('../../utils/util.js')

var sliderWidth = 30; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["活动上传", "活动下架"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    title: '',
    intro: '',
    image: '',
    activities: []
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
      url: config.service.getBannerUrl,
      method: 'get',
      success: res => {
        console.log(res)
        let data = res.data.data
        this.setData({
          activities: data
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
  inputTitle: function (e) {
    this.data.title = e.detail.value
  },
  inputIntro: function (e) {
    this.data.intro = e.detail.value
  },
  uploadAct: function(){
    wx.request({
      url: config.service.uploadActUrl,
      method: 'post',
      data:{
        title: this.data.title,
        intro: this.data.intro,
        image: this.data.image
      },
      success: res => {
        console.log(res)
        let data = res.data.data
        if(data == '上传成功'){
          util.showSuccess(data)
          wx.redirectTo({
            url: 'uploadAct',
          })
        } else {
          util.showModel("", data)
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
  // 删除活动
  deleteAct: function(e){
    let bnid = e.currentTarget.dataset.bnid
    wx.request({
      url: config.service.deleteActUrl,
      method: 'get',
      data: {
        bnid: bnid
      },
      success: res => {
        console.log(res)
        wx.redirectTo({
          url: 'uploadAct',
        })
      }
    })
  }
})