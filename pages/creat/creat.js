// pages/creat/creat.js
var app = getApp();
var WxApi = require("../../utils/API.js"); //引用api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sbzldata: []
  },
  getlist: function() {
    let _this = this
    wx.request({
      url: WxApi.creat,
      data: {
        user_id: wx.getStorageSync('user_id')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.showLoading({
          title: '正在加载，请稍后~',
        })
        if (res.data.status == 0) {
          _this.setData({
            list: res.data.data
          })
        }
      },
      fail: function(res) {

      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },
  // 表单提交
  formSubmit: function(e) {
    console.log(e.detail.value)
    let datas = e.detail.value
    datas.user_id = wx.getStorageSync('user_id')
    wx.request({
      url: WxApi.submit,
      data: datas,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
    
        if (res.data.status == 0) {
         wx.showModal({
           title: '提示',
           content: res.data.msg,
         })
         
        }
      },
      fail: function(res) {

      },
      complete: function(res) {
        
      }
    })
  },
  // 监听单选
  radioChange: function(e) {
    let _this = this
    console.log(e.detail.value)
    wx.request({
      url: WxApi.species,
      data: {
        id: e.detail.value
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.showLoading({
          title: '正在加载，请稍后~',
        })
        if (res.data.status == 0) {
          _this.setData({
            sbzldata: res.data.data
          })
        }
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
    // 获取下拉数据
    this.getlist()
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