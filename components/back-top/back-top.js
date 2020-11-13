// components/backTop/backTop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollTop:{
      type:Number,
      value:0,
      observer:function(newVal,oldVal){
        this.setData({
          scrollTop:newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop:0
  },
  attached: function() {
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goTop: function () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    },
    
  }
})
