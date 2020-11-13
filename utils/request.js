//封装请求
const http = ({ url = '', param = {}, method } = {}) => {

   
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: param,
            header: {
                'content-type': 'application/json' 
            },
            method: method,
            complete: (res) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data)
                    console.log(res.data)
                } else {
                    reject(res)
                }
            }
        })
    })
}

// const getUrl = (url) => {
//     if (url.indexOf('://') == -1) {
//         url = baseUrl + url;
//     }
//     return url
// }
const getUrl = (url) => {

    return url
}
// get方法
const _get = (url, param = {}, loadtext) => {
    return http({
        url,
        param,
        method: 'get',
        loadtext
    })
}

const _post = (url, param = {}, loadtext) => {
    return http({
        url,
        param,
        method: 'post',
        loadtext
    })
}

const _put = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}

const _delete = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}



module.exports = {
    _get,
    _post,
    _put,
    _delete
}