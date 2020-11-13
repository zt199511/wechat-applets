// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstid:0,
    heires:[],
    leftres:{},
    leftScrollTop:0,
    scrollIntoView: '',
    classificationsLists:[{
      name:"男装1",
      id:1
    },{
      name:"男装2",
      id:2,
    },{
      name:"男装3",
      id:3
    },{
      name:"男装4",
      id:4
    },{
      name:"男装5",
      id:5
    },{
      name:"男装6",
      id:6
    },{
      name:"男装7",
      id:7
    },{
      name:"男装8",
      id:8
    },{
      name:"男装9",
      id:9
    },{
      name:"男装10",
      id:10
    },{
      name:"男装11",
      id:11
    },{
      name:"男装12",
      id:12
    }],
    classificationsTypeLists:[{
      name:"男装1",
      id:1
    },{
      name:"男装2",
      id:2,
    },{
      name:"男装3",
      id:3
    },{
      name:"男装4",
      id:4
    },{
      name:"男装5",
      id:5
    },{
      name:"男装6",
      id:6
    },{
      name:"男装7",
      id:7
    },{
      name:"男装8",
      id:8
    },{
      name:"男装9",
      id:9
    },{
      name:"男装10",
      id:10
    },{
      name:"男装11",
      id:11
    },{
      name:"男装12",
      id:12
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = wx.createSelectorQuery();
    let that = this;
    let classlist = that.data.classificationsTypeLists;
    let leftclasslist = that.data.classificationsLists;
    let h = [];
 

    for (let i = 0; i < classlist.length; i++) {
     if(classlist[i].id || classlist[i]==0){
       let ids = "#s"+classlist[i].id;
       if(i == 0){
        let lids = "#l"+classlist[i].id;
        query.select(lids).boundingClientRect(function(rect){
          that.setData({
            leftres:rect
          }) 
         }).exec();
       }
       query.select(ids).boundingClientRect(function(rect){
        h.push(rect);
        that.setData({
          heires:h
        }) 
       }).exec();

     }
      
    };
    
  },

  
  //点击左侧按钮
  choicfir:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.setData({
      firstid:index,
      scrollIntoView: 's' + id
    });
  },
  //滚动右侧商品
  scorllRightBody:function(e){
   
    //滚动高度大于等于可视化区域的item 小于下一个item
    let that = this;
    let initLeftHeight = that.data.leftres.height;
    let scrTop = e.detail.scrollTop;
    let heires = that.data.heires
    let hei = 0
    let oldhei = 0;
    for (let i = 0; i < heires.length; i++) {
      hei = hei + heires[i].height;
      oldhei = oldhei + (i - 1 < 0 ? 0 : heires[i - 1].height)
      //可视区域
      if (oldhei < scrTop && scrTop < hei) {
       if(that.data.firstid != i){
        that.setData({
          firstid: i,
          leftScrollTop:i*initLeftHeight
        })
       }
      };
    }
  }
})