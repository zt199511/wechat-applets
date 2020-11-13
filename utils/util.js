


/*函数节流*/

 const Throttle =(fn, interval)=> {

    var enterTime = 0;//触发的时间
  
    var gapTime = interval || 300;//间隔时间，如果interval不传，则默认300ms
  
    return function () {
  
      var context = this;
  
      var backTime = new Date();//第一次函数return即触发的时间
  
      if (backTime - enterTime > gapTime) {
  
        fn.call(context, arguments);
  
        enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
  
      }
  
    };
  
  }
  
  /*函数防抖*/
  
  const Debounce = (fn, interval)=>{
  
    var timer;
  
    var gapTime = interval || 1000;//间隔时间，如果interval不传，则默认1000ms
  
    return function () {
  
      clearTimeout(timer);
  
      var context = this;
  
      var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
  
      timer = setTimeout(function () {
  
        fn.call(context, args);
  
      }, gapTime);
  
    };
  
  }
  
  //时间类
  class Time {
    //获取当前时间
    getDateTime() {
      return Date.parse(new Date()) / 1000;
    }
    //时间转换成时间戳
    timeTotimestamp(value) {
      return Date.parse(new Date(value)) / 1000;
    }
    //获取时间差 时间差规则自定
    formatReturnTime(timeStr) {
      let filterTime = '';
      let utc = this.getDateTime() - this.timeTotimestamp(timeStr);
      let diffDay = utc / (24 * 60 * 60); //天
      let diffMintus = parseInt(diffDay * 24 * 60); //分钟
      let diffHours = parseInt(diffDay * 24); //小时
      if (diffDay < 1) {
        if (diffMintus < 60) {
        
          if (diffMintus > 0) {
            filterTime = parseInt(diffMintus) + "分钟前";
          } else {
            filterTime = "刚刚";
          }
        } else {
          filterTime = parseInt(diffHours) + "小时前";
        }
      } else if (diffDay > 31) {
        filterTime = parseInt(diffDay / 30) + "月前";
      } else if (diffDay < 31) {
        filterTime = parseInt(diffDay) + "天前";
      };
      return filterTime;
    }
  }
  //export default 只导出一条  export可导出多条
  export { 
    Time,
    Debounce,
    Throttle
  }