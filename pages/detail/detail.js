// pages/detail/detail.js
var app = getApp();
var WxApi = require("../../utils/API.js"); //引用api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: [],
    datas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getlist: function() {
    let _this = this
    let datas = {
      id: wx.getStorageSync('detail_id'),
      user_id: wx.getStorageSync('user_id')
    }
    app.Wxrequest(WxApi.detail, datas).then((res) => {
    
      let data = JSON.parse(JSON.stringify(res.data.data));

      let keys = Object.keys(data);

      keys.forEach(item=>{
        if (item != 'jlxxbinfo'){
          data[item].map(i=>{
     
            try{

              if(data.jlxxbinfo[item].split(',').indexOf(i.name) != -1){
                return i.checked = 'checked';
              }
              
            }catch(e){
              if (data.jlxxbinfo[item] == i.name) {
                return i.checked = 'checked';
              }
            }
          })
        }
      })



      _this.setData({
        list: data,
      });

      console.log(_this.data.list)
     
    })
    // let listdata = this.data.list

  },
  f_list: function(big, small) {
    for (var i in big) {
      for (var j in small) {
        if (small[j] == big[i]) {

        }
      }
    }
  },
  //项目类型
  xiamgmu: function(e) {
    console.log(e)
    this.setData({
      xiangmu_id: e.detail.value
    })
  },
  onLoad: function(options) {

    //调用详情的接口
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