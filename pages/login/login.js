// pages/login/login.js
var app = getApp();
var WxApi = require("../../utils/API.js"); //引用api
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //登录
  formSubmit: function(e) {
    let datas = {
      zhanghao: e.detail.value.userName,
      mima: e.detail.value.userPassword
    }
    wx.request({
      url: WxApi.login,
      data: datas,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.showLoading({
          title: '正在登录~',
        })

        // 如果是0代表登录成功 跳转到列表页
        if (res.data.status == 0) {
          console.log(res)
          wx.showLoading({
            title: 'res.data.msg',
          })
          // 设置后台返回的user_id
          wx.setStorageSync('user_id', res.data.data)
          wx.switchTab({
            url: '../result/result',
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {
              console.log(res)

            }
          })
          wx.navigateBack({})
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    app.PullDownRefresh() //下拉函数
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})