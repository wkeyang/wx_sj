// pages/leftSwiperDel/index.js
var app = getApp();
var WxApi = require("../../utils/API.js"); //引用api
Page({
  data: {
    delBtnWidth: 160, //删除按钮宽度单位（rpx）
    startX: '',
    list: [],
    page: '1',
  },
  //获取列表
  getlist: function() {
    let _this = this
    wx.request({
      url: WxApi.list,
      data: {
        user_id: wx.getStorageSync('user_id'),
        page: _this.data.page
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        let list = _this.data.list
        // 如果当前页面是第一页 第一次加载 就设置为空数组
        if (_this.data.page == '1') {
          list = []
        }
        if (res.data.status == 0) {
          _this.setData({
            list: list.concat(res.data.data.data)
          })

        }
        console.log(res.data.data.data)
      },
      fail: function(res) {

      },
      complete: function(res) {
        wx.hideLoading()
      }

    })
  },
  detail: function(e) {
    console.log(e.currentTarget.dataset.id)
    // 点击的id
    let id = e.currentTarget.dataset.id
    wx.setStorageSync('detail_id', id)
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  onLoad: function(options) {
    this.getlist()
    // wx.navigateTo({
    //   url: '../login/login',
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)

    //   }
    // })
    // 页面初始化 options为页面跳转所带来的参数
    this.initEleWidth();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
    console.log(e.touches[0].clientX)
  },
  touchM: function(e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          list: list
        });
      }
    }
  },

  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      console.log(e);
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          list: list
        });
      }
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件
  delItem: function(e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var list = this.data.list;
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
      list: list
    });
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    app.PullDownRefresh() //下拉函数
    this.onLoad()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',

    })
    // 页数+1
    let page = this.data.page
    page = Number(page)
    this.setData({
      page: page + 1
    })
    console.log(this.data.page)
    this.getlist()
    // wx.request({
    //   url: 'https://xxx/?page=' + page,
    //   method: "GET",
    //   // 请求头部
    //   header: {
    //     'content-type': 'application/text'
    //   },
    //   success: function (res) {
    //     // 回调函数
    //     var moment_list = that.data.moment;

    //     for (var i = 0; i < res.data.data.length; i++) {
    //       moment_list.push(res.data.data[i]);
    //     }
    //     // 设置数据
    //     that.setData({
    //       moment: that.data.moment
    //     })
    //     // 隐藏加载框
    //     wx.hideLoading();
    //   }
    // })

  },


})