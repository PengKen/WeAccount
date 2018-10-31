
import HttpUtil from '../utils/httpUtil'

class HomeAPI{
  /**
    @desc 获取账户的资产，默认是用户的所有资产
    @params null
    @return { balance }
   */
  static getAccountBalance = () => {
    return  HttpUtil.get("balances/"+1)
  }

  /**
   * @desc 根据特定年的获取用户当年所有月的出纳，默认当前年
   * @param month，year
   * @return [{income, expenditure }]
   */

  static getUserCashier = (year) => {
    return HttpUtil.get('cashiers/'+id+'?year='+year)
  }

  /**
   * @desc 获取用户自行设置的提醒事项
   * @param type 返回的提醒事项的条目，默认3天内,可选参数{recently, all}
   * @returns [{ remindId, summary(概要) , date , detail(消息内容)}]
   */
  static getReminds = (type = 'recently') => {
    return HttpUtil.get('reminds/'+id +'?type='+type)
  }


  /**
   * @desc获取用户账单(不带特殊条件，如：买入和卖出，种类，年份，月份等条件)
   * @param type type 返回的账簿的条目，默认3天内,可选参数{recently, all}
   * @returns [{
   *              accountId,
   *              date,
   *              productName,
   *              amount(货物数量),
   *              transactionType(交易类型:{buy(买) , sale(卖)}),
   *              clientName(交易客户),
   *           }]
   */
  static getAccountsWithoutSpecific = (type = 'recently') => {
    return HttpUtil.get('accounts/'+id + '?type='+type)
  }




 }


 export default HomeAPI