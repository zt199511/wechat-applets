//index.js
//获取应用实例
const app = getApp();
const rpn = require("../../utils/rpn.js");
Page({
    data: {
        computeNum: "0", //计算步骤
        computeResult: '', //计算结果
        sideHide: false,
        percentNum: "",
        lastIsOperator: false,
        btnId: {
            id1: "1",
            id2: "2",
            id3: "3",
            id4: "4",
            id5: "5",
            id6: "6",
            id7: "7",
            id8: "8",
            id9: "9",
            id0: "0",
            id11: "+",
            id12: "-",
            id13: "×",
            id14: "÷",
            id15: ".",
            id16: "back",
            id17: "=",
            id18: "side",
            id19: "clear",
            id20: "(",
            id21: ")",
            id22: "%",

        }
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数

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
    //事件处理函数
    showCompute: function() { //显示计算器操作
        var _this = this;
        _this.setData({
            sideHide: false
        })
    },
    computeClick: function(event) {
        var _this = this,
            id = event.target.id,
            percentNum,
            cNum = _this.data.computeNum,
            pNum = _this.data.percentNum,
            initresult = _this.data.computeResult;
        if (id == _this.data.btnId.id16) { //点击回退按钮 
            if (cNum == 0) {
                return;
            } else {
                cNum = cNum.substring(0, cNum.length - 1);
                if (cNum == "" || cNum == "-") {
                    cNum = 0;
                };

            }
        } else if (id == _this.data.btnId.id19) { //点击清屏幕按钮
            cNum = 0;
            _this.setData({
                computeResult: ""
            })

        } else if (id == _this.data.btnId.id18) { //收起计算器操作
            _this.setData({
                sideHide: true
            })
        } else if (id == _this.data.btnId.id17) { //点击等于按钮计算

            if (cNum == 0) {
                return;
            };
            // var lastNum = cNum.substring(cNum.length - 1, cNum.length);
            // if (isNaN(lastNum)) { //验证最后一个是否为数字
            //     return;
            // };
            if (parseFloat(cNum) == cNum) {
                return;
            };
            //rpn 计算器运算
            var result = rpn.calcExpression(pNum);
            _this.setData({
                computeResult: result
            })
        } else {

            //判断是否连续添加+-x/
            if (id == _this.data.btnId.id11 || id == _this.data.btnId.id12 || id == _this.data.btnId.id13 || id == _this.data.btnId.id14 || id == _this.data.btnId.id22) {
                if (_this.data.lastIsOperator || cNum == 0) {

                    return;
                }
            }

            if (cNum == 0) {

                cNum = id;
                pNum = id;

            } else {

                cNum = cNum + id;
                pNum = pNum + id;

            };

            // if (!initresult == "") {
            //     cNum = 0;
            //     _this.setData({
            //         computeNum: cNum,
            //     })
            // }
            if (id == _this.data.btnId.id11 || id == _this.data.btnId.id12 || id == _this.data.btnId.id13 || id == _this.data.btnId.id14 || id == _this.data.btnId.id22) {

                _this.setData({ lastIsOperator: true });
            } else {
                _this.setData({ lastIsOperator: false })
            }

        };
        _this.setData({
            computeNum: cNum,
            percentNum: pNum
        })
    },
    percentCompute: function(event) { //计算百分比 到另外一隐藏区域
        var _this = this,
            id = event.target.id,
            percentNum,
            cNum = _this.data.computeNum;

        if (cNum == 0) {
            cNum = id;
            return;
        } else {
            percentNum = cNum + "/100";
            cNum = cNum + id;


            _this.setData({
                percentNum: percentNum
            });

        }
        _this.setData({
            computeNum: cNum

        })

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
        }
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})