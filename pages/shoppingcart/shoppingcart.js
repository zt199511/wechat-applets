// pages/shoppingcart/shoppingcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsNum: "",
    priceTotal:0,
    imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
    shopCartLists: [{
      imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      name: "大衣服",
      id: 1,
      num: 1,
      price:1
    }, {
      imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      name: "大衣服",
      id: 2,
      num: 2, price:1
    }, {
      imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      name: "大衣服",
      id: 2,
      num: 2,
      price:1
    }, {
      imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      name: "大衣服",
      id: 2,
      num: 2,
      price:1
    }, {
      imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      name: "大衣服",
      id: 2,
      num: 2,
      price:3
    }, {
      imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      name: "大衣服",
      id: 2,
      num: 2,
      price:4
    }, {
      imageURL: "https://img.yzcdn.cn/vant/ipad.jpeg",
      name: "大衣服",
      id: 2,
      num: 2,
      price:5
    }],
    allChecked: false,
  },
  onClose(event) {
    const { position, instance } = event.detail;
    let that = this;
    let index = event.currentTarget.dataset.index;
    instance.close();
    if(position == "right"){
      that.data.shopCartLists.splice(index,1);
      that.setData({
        shopCartLists:that.data.shopCartLists
      })
    };
    
  // let query = wx.createSelectorQuery()
  // let obj = `.s-${index+1}`; 
  // query.select(obj).close();
  },
  changeItem: function (e) {
    let that = this;
    let i = e.currentTarget.dataset.index;
    let shopCartLists = that.data.shopCartLists; 
    this.setData({
      [`shopCartLists[${i}].checked`]: e.detail
    });
    let isAllChecked =  shopCartLists.every((item)=>{
      return item.checked
    });
     this.setData({
      allChecked: isAllChecked
    });
    that.checkedGoodsTotal();
  },
  changeAll: function (e) {
    let that = this;
    this.setData({
      allChecked: e.detail
    });
    for (let i = 0; i < that.data.shopCartLists.length; i++) {
      this.setData({
        [`shopCartLists[${i}].checked`]: e.detail
      })
    };
    that.checkedGoodsTotal();
  },
  checkedGoodsTotal:function(){
    let that = this;
    let shopCartLists = that.data.shopCartLists;
    let numTotal = 0; 
    let priceTotal = 0;
    let checkedArray = shopCartLists.filter((item)=>{
      return item.checked;
    });

    if(checkedArray.length > 0){
      for (let i = 0; i < checkedArray.length; i++) {
        let num = checkedArray[i].num;
        let price = checkedArray[i].price;
        numTotal += parseInt(checkedArray[i].num);
        priceTotal += parseFloat(price)*parseInt(checkedArray[i].num);
      }
      that.setData({
        goodsNum:`(${numTotal})`,
        priceTotal:priceTotal*100
      })
    }else{
      that.setData({
        goodsNum:"",
        priceTotal:0
        
      })
    }
    
  },
  changeGoodsNum:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let shopCartLists = that.data.shopCartLists;
    this.setData({
      [`shopCartLists[${index}].num`]: e.detail
    });
    that.checkedGoodsTotal();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})