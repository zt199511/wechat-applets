/**
 * 封装wx.request
 */
class request {
  constructor() {
    this.header = {
      'content-type':'application/json'
    },
    this.tips = {
      1:"抱歉，出现了一个错误！"
    }
    this.baseUrl = 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/'
  }
  showError(errorCode){
    if(!errorCode){
      errorCode = 1;
    };
    wx.showToast({
      title: this.tips[errorCode],
      icon:'none',
      duration:2000
    })
  }
  request({url, data={}, header=this.header, method='GET'}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl+url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
          	//200: 服务端业务处理正常结束
            resolve(res.data);

          } else {
            reject(res);
            this.showError(res.error_code)
          }
        }),
        fail: (res => {
          reject(res);
          this.showError()
        })
      })
    })
  }
}

export default request