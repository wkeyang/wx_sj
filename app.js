//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  }, //封装请求函数
  Wxrequest: function (url, data) {
    var promise = new Promise((resolve, reject, fail) => {
      var that = this;
      //网络请求
      wx.request({
        url: url,
        data: data,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {

          // res.data为后台返回数据    假设返回数据为 {code: "1", message: "操作成功", uuid: "otfB65TqAdl3mQXf49t20tgZczhA", result: {…}}
          if (res.data.status == 0) { //code=1时表示操作成功，result为后台返回的结果数据
            
            resolve(res);
          }
          if (res.data.status != 0) { //返回的错误信息
            wx.showModal({
              title: '提示',
              content: res.data.msg,
            })
          }  else { //否则返回后台错误提示信息message
            reject(res);
          }
        },
        fail: function (e) {
         
        }
      })
    });
    return promise;
  },
  //封装下拉刷新
  PullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000);
  },
  globalData: {
    userInfo: null,
    api:'' //域名

  }
})