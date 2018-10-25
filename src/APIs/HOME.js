
import HttpUtil from '../utils/httpUtil'

class HomeAPI{
  /**
    @desc 获取账户的资产，默认是用户的所有资产
    @params null
    @return { balance }
   */
  static getAccountBalance = () => {
    return  HttpUtil.get("balances/"+id)
  }

  /**
   * @desc 根据月份获取用户当月的出纳
   * @param month
   * @return {income, expenditure }
   */

  static getUserCashier = (month) => {
    return HttpUtil.get('cashiers/'+id+'?month='+month)
  }

  /**
   * @desc 获取用户自行设置的提醒事项
   * @param type 返回的提醒事项的条目，默认3天内,可选参数{recently, all}
   * @returns [{ remindId, summary , date , detail}]
   */
  static getReminds = (type = 'recently') => {
    return HttpUtil.get('reminds/'+id +'?type='+type)
  }


  /**
   * @desc获取用户账单
   * @param type type 返回的账簿的条目，默认3天内,可选参数{recently, all}
   * @returns {*}
   */
  static getAccounts = (type = 'recently') => {
    return HttpUtil.get('accounts/'+id + '?type='+type)
  }




 }