import HTTP from '../utils/http.js'
class IndexModel extends HTTP {
  constructor() {
    super();
  }
  /*
   * 查询所有新闻列表
   */
  getNewsList(data) {
    return this.request({
      url: 'list',
      method: 'GET',
      data: data
    })
  }
}

export default IndexModel