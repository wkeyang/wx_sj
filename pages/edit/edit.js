// pages/user/user.js
var WxApi = require("../../utils/API.js");  //引用api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit_font: '保存', //保存 编辑
    user: {
      nickname: '测试',
      sex: '男',
    }
  },
  edits: function() {
    wx.navigateTo({
      url: '../edit/edit',
      success: function(res) {},
      fail: function(res) {

      },
    })
  },
  // 表单提交
  formSubmit: function(e) {
    var _this = this
    console.log(e.detail.value)
    // 表单里面的数据
    let datas = e.detail.value
    wx.request({
      url: '',
      data: {
        datas
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json',
      },
      success:function(res){
       wx.showLoading({
         title: '正在提交',
       })
      }, 
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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