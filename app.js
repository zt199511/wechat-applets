//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
      var that = this;
      that.checkSessionLogin();
      that.checkUserInfo();
      that.getSystemInfo();
  },
  //获取系统信息
  getSystemInfo(){
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        
        this.globalData.navHeight = navHeight;
        
        this.globalData.navTop = navTop;        //navTop
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  //获取手机号授权登录
  getPhoneNumber: function (res) {
    const that = this;
    if (res.detail.errMsg == 'getPhoneNumber:fail user deny'){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您已拒绝授权，请重新点击并授权',
        success: function () { }
      })
    } else if (res.detail.errMsg == 'getPhoneNumber:fail 用户未绑定手机，请先在微信客户端进行绑定后重试'){
      return;
    } else if (res.detail.errMsg == 'getPhoneNumber:ok'){
      wx.checkSession({
        success() {
          console.log(res)
        },
        fail() {
          console.log(1)
        }
      })
    }
  
  },
  //判断sessionKey login
  checkSessionLogin:function(){
    const that = this;
    wx.checkSession({
      success: (res) => {
      },fail:(error)=>{
        wx.login({
          success: res => {
            console.log(res);
            return false
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            that.http('v1/wx/getUser', { code:res.code}).then(res=>{
              const app = getApp()
              app.globalData.openid = res.data.openid
              app.globalData.userInfo = res.data
              wx.setStorageSync('openid', res.data.openid);
              if (!res.data.mobile) {
                wx.reLaunch({
                  url: "/pages/bindPhone/index"
                });
              }
            })
          }
        })
      }
    })
  
  },
  //判断授权获取信息
  checkUserInfo: function (cb) {
    const that = this
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo, true);
    } else {
      wx.getSetting({
        success: function (res) {
  
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = JSON.parse(res.rawData);
                typeof cb == "function" && cb(that.globalData.userInfo, true);
              }
            })
          } else {
            typeof cb == "function" && cb(that.globalData.userInfo, false);
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    openid: null,
    appBaseApiUrl:"https://app1.usbuydo.com",
    navHeight:0,
    navTop:0        
  }
})