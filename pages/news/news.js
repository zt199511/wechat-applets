const app = getApp();
const globaldata = require('../../utils/globaldata.js')
const request = require('../../utils/request.js')
import { formatTime } from '../../utils/util.js'
Page({
    data: {
        page: 1,
        pages: 2,
        rLoad: false,
        hasMore: true,
        questionJson: [],
    },
    onLoad(options) { // 页面初次加载，请求第一页数据
        this.isEmptyPage()
        this.getQuestionList(1)
        this.ajax()
        
    },
    onPullDownRefresh() { // 上拉刷新
        wx.showNavigationBarLoading()
        this.getQuestionList(1,1);
        
       
    },
    onReachBottom() { //下拉加载
        if (this.data.page < this.data.pages){
            this.data.page = this.data.page + 1
            this.getQuestionList(this.data.page)
        }
    },
    onTapdetail: function (event) {
        var id = event.currentTarget.dataset.id   //获取传递的值
        wx.navigateTo({
            url: '../newdetail/newdetail?id=' + id   //传递参数
        })
    },
    ajax:function(){
      const ajaxUrl = 'http://192.168.31.100:9000/t/tools/getChildCategory'
      const data = {
        pid:37,
        type:1
      }
      request._post(ajaxUrl, data).then(res => {
        if (res) {
          console.log(res)
        }
      }).catch(err => {
        //失败

      }).then(() => {
       
      })
    },
    //判断当前页是否大于或总页数 
    isEmptyPage: function () {
        let that = this
        if (that.data.page >= that.data.pages) {
            that.setData({
                hasMore: false
            })
        } else {
            that.setData({
                hasMore: true
            })
        }
        console.log(that.data.hasMore)
    },
    getQuestionList: function (page, isPullRefresh) {
        let that = this
        let loadtext = '加载中...'
        let requestUrl = globaldata.listUrl

        if (that.data.rLoad) return;
        that.setData({
            rLoad: true
        })
        request._get(requestUrl, page, loadtext).then(res => {
            if (res) {
                for (var i = 0; i < res.newslist.length; i++) {
                    res.newslist[i]["timestamp"] = formatTime(res.newslist[i]["timestamp"], 'Y/M/D h:m:s')
                }
                that.setData({
                    questionJson: isPullRefresh ? res.newslist : that.data.questionJson.concat(res.newslist)
                })
            }
        }).catch(err => {
            //失败

        }).then(() => {
            //如果当前页数大于或等于总页数
            if (isPullRefresh && isPullRefresh == 1) {
                this.data.page = 1
                setTimeout(function () {
                    wx.hideNavigationBarLoading()
                    wx.stopPullDownRefresh()
                }, 1000)
            }
            that.isEmptyPage()
            that.setData({
                rLoad: false
            })
        })

    },
})