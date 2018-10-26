var moment = require('moment');

moment.locale('zh-cn') //设置语言

class Time {
  /**
   * @desc 获取当前时间
   * @returns {string} 2018年9月26日 14:00
   */
  static getCurrentFullTime = () => {
    return moment().format("YYYY年M月DD日 HH:mm")
  }



  /**
   * @desc 获取当前年份
   * @returns {string} 2018
   */
  static getCurrentYear = () => {
    return moment().format('YYYY')
  }

  /**
   * @desc 获取当前月份
   * @return {string} 4
   */
  static getCurrentMonth = () => {
    return moment.format('M')
  }


  /**
   * @desc 获取相对时间
   * @param time 2018年9月1日 14:00
   * @returns {string} 几天前，几分钟前
   */

  static getRelativeTime = (time) => {
    return moment(time, "YYYY年M月DD日 HH:mm").fromNow()
  }

  /**
   *
   * @desc 获取当前时间毫秒数
   * @return {number}
   */
  static getMillSecond = () => {
    return moment().valueOf()
  }

}

export default Time