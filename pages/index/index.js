//index.js
//获取应用实例
const app = getApp()
import {Time,Debounce} from '../../utils/util.js'
import IndexModel from '../../apis/index.js';
const indexModel = new IndexModel();
const ClassTime = new Time();
Page({
    data: {
        banner: [{
                image: '//img13.360buyimg.com/babel/s590x470_jfs/t1/122313/29/17164/137398/5f9ff284Ed7b9d8d6/1040c6edb8c1db5b.png.webp',
            }, {
                image: '//img11.360buyimg.com/pop/s590x470_jfs/t1/153699/39/4540/68068/5fa11dfcE2e7f643d/19aed338638aec0a.jpg.webp',
            }, {
                image: '//img14.360buyimg.com/pop/s590x470_jfs/t1/132240/14/14180/44285/5f9d7b3aE25c0bdd2/b4cbb984ce657155.jpg.webp',
            },
            {
                image: '//imgcps.jd.com/ling4/15424867551/5LiT6L2m6KOF6aWw5a6a5Yi2/5q-P5ruhMjAw5YePMjDlhYM/p-5bd8253082acdd181d02fa33/35bcfde7/cr/s/q.jpg'
            }
        ],
        categoryActive: 0,
        categoryNavLists: [{
            title: "首页"
        }, {
            title: "美妆"
        }, {
            title: "小机电"
        }, {
            title: "男装"
        }, {
            title: "个护清洁"
        }, {
            title: "食品清洁"
        }, {
            title: "数码"
        }, {
            title: "玩具"
        }, {
            title: "内衣"
        }, {
            title: "男鞋"
        }, {
            title: "食品清洁"
        }, {
            title: "数码"
        }, {
            title: "玩具"
        }, {
            title: "内衣"
        }, {
            title: "男鞋"
        }, {
            title: "食品清洁"
        }, {
            title: "数码"
        }, {
            title: "玩具"
        }, {
            title: "内衣"
        }, {
            title: "男鞋"
        }, {
            title: "食品清洁"
        }, {
            title: "数码"
        }],
        animation: '',
        overlayShow: false,
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        rLoad: false,
        newsParams: {
            sub_srv_id: '24hours',
            srv_id: 'pc',
            offset: 0,
            limit: '20',
            strategy: '1',
            ext: {
                "pool": ["top"],
                "is_filter": 7,
                "check_type": true
            }
        },
        newsLists:[],
        arrowTabsShow: false,

    },
    //事件处理函数
    login: function() {

    },

    onLoad: function() {

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
    
                // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        };
        this.getNewsList();
    },
    getNewsList: function() {
        const that = this
          
        if (that.data.rLoad) return;
        that.setData({
            rLoad: true
        });
        wx.showLoading({
          title: '数据加载中....',
        })
       
        indexModel.getNewsList(that.data.newsParams).then(res => {
            let jsonList = res.data.list;
            for (let i = 0; i < jsonList.length; i++) {
                jsonList[i].diffTime = ClassTime.formatReturnTime(jsonList[i].create_time);
            }
            that.setData({
                newsLists:  that.data.newsLists.concat(jsonList)
            })
            
        }).catch(err => {
            //失败

        }).then(() => {
            that.setData({
                rLoad: false
            });
            wx.hideLoading()
        })

     

    },
    onReachBottom:function(){
        const that = this
        that.setData({
            'newsParams.offset':parseInt(that.data.newsParams.offset)+20
        })
        that.getNewsList();
      },  
    
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    getBanner: function() {
        const that = this;
        const bannerApi = appUrl + '/api/index/getAdList'
        request._post(bannerApi).then(res => {
            if (res.code === 200) {
                let bannerList = [].concat(res.data);
                that.setData({
                    banner: bannerList
                })
            }
        })
    },
    setArrowBox: function() {
        const that = this;
        that.setData({
            arrowTabsShow: !that.data.arrowTabsShow
        })
    },
    chooseTab: function(e) {
        const that = this;
        let index = e.currentTarget.dataset.index;
        that.setData({
            categoryActive: index,
            arrowTabsShow: !that.data.arrowTabsShow

        })
    },
    onChangeTabs: function(e) {
        const that = this;
        that.setData({
            categoryActive: e.detail.name
        })

    },

    onPageScroll: Debounce(function(e) { // 获取滚动条当前位置
        this.setData({
            scrollTop: e[0].scrollTop
        })
    })
})