// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
    
    },
    userAvatar:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showPopup: false,
    userGroup: "",
    userid: "213213213",
    acvtieNums:{
      scoreCount: "-",
      subscribeCount: "-",
      followCount: "-",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      userAvatar: "https://pic1.acc5.cn/010/91/37/69_avatar_middle.jpg",
    });
    app.checkUserInfo(function (userInfo, isLogin) {
      if (!isLogin) {
        that.setData({
          showPopup: true
        })
      } else {
        that.setData({
          userInfo: userInfo
        });
      }
    });
  },
  getPhoneNumber:function(res){
   app.getPhoneNumber(res)
  },
  /**
  * 返回
  */
  navigateBack: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        showPopup: !this.data.showPopup,
        userInfo: e.detail.userInfo
      });
    } else {
      wx.switchTab({
        url: '../index/index'
      })
    }
  },

 
})