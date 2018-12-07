import HttpUtil from '../utils/httpUtil'

class AccountAPI {

    /**
     * @desc 限定时间内，根据货物类型返回所有账单
     * @param timeArea [起始时间，结束时间]
     * @param cargoNames [cargoNameA, cargoNameB] || all
     */
    static getAccountsWithSpecific = (timeArea,cargoNames) => {
        return HttpUtil.fetch('accounts/'+1 + '?timeArea='+timeArea+'?cargoNames='+cargoNames)
    }
}