// pages/user/user.js
var app = getApp();
var WxApi = require("../../utils/API.js"); //引用api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit_font: '编辑', //保存 编辑
    user: {
      nickname: '测试',
      sex: '男',
    },
  },
  edits: function() {
    wx.navigateTo({
      url: '../edit/edit',
      success: function(res) {},
      fail: function(res) {

      },
    })
  },
  getdata: function() {
    let _this = this
    wx.request({
      url: WxApi.seeuser,
      data: {
        user_id: wx.getStorageSync('user_id')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.showLoading({
          title: '加载中',
        })
        if(res.data.status==0){
          _this.setData({
            user:res.data.data
          })
        }
        console.log(_this.data.user)
      },
      fail: function(res) {

      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取登录返回的user_id
    console.log(wx.getStorageSync('user_id'))
    this.getdata()
  },

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