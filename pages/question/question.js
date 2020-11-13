const app = getApp();
const globaldata = require('../../utils/globaldata.js')
const request = require('../../utils/request.js')
import {formatTime} from '../../utils/util.js'

Page({
    data: {
        page: 1,
        pages: 2,
        rLoad: false,
        hasMore: true,
        scrollHeight: 0,
        questionJson: [],
    },
    onLoad(options) {
        // 页面初次加载，请求第一页数据
        var that = this
        const systemInfo = wx.getSystemInfoSync();
        that.setData({
            scrollHeight: systemInfo.windowHeight
        })
        that.isEmptyPage()
        that.getQuestionList(1)
     
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
    },
    //该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    topLoad: function (event) {
        wx.showNavigationBarLoading()
        this.getQuestionList(1, 1)
    },
    //页面滑动到底部
    bindDownLoad: function () {
        if (this.data.page < this.data.pages) {
            this.data.page = this.data.page + 1
            this.getQuestionList(this.data.page)
        }

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