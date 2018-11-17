/*
    redux-thunk 的作用其实就是改变传统的dispacth的参数只能是一个对象的现状，
    通过react-thunk 可以 使得dispatch的参数是一个对象或者是函数，如下面的getAccount最终返回的是一个函数
    但我们仍可以通过dipacth(getAccount()),
    Question：为什么不把异步的请求(或者需要在创建action对象之前，触发其它的dispatch)放到reducer中去，而一定要通过
    redux-thunk来完成这些异步请求或者事先触发其它的dispatch

    Answer：因为reducer是纯函数，只用来计算state，不适合进行其它操作。
    Tips:纯函数不能引用外部的变量，只能引用自己的参数

    react-thunk的核心源码：

    function createThunkMiddleware(extraArgument) {
      return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
       }
       return next(action);
  };
}
 */
import HomeAPI from '../../APIs/HomeAPI'
import GlobalAPI from '../../APIs/GlobalAPI'
import TimeUtil from '../../utils/timeUtil'
import CountUp from '../../components/CountUp'

class HomeActions {
  /**
   * @desc 获取用户的总资产
   * @return {function(*, *)}
   */
  static getAccountBalance = () => {

    return async (dispatch,getState) => {
      /*
          在这个函数内部可以发起http请求和触发其它的dispatch，但最终不一定要返回一个类似{ type,payload }
          的对象，因为thunk中间件最主要的是在这里事先封装我们最终需要dispatch的action，所需要的一些逻辑，
          换句话说，其实就是将几个dispatch融合在一起，最终融合成我们需要的dispatch，并不会去到reducer中switch
       */


      const data = await HomeAPI.getAccountBalance()
      const count = new CountUp('balance','200',data.balance,2,2)
      count.start()

    }
  }

  /**
   * @desc 获取特定年各个月的出纳
   * @param year
   * @return {function(*, *)}
   */

  static getCashierByMonth = (year=TimeUtil.getCurrentYear()) => {
      return async (dispatch , getState) => {
        const cashiers= await  HomeAPI.getUserCashier(year)
        dispatch({
          type:'CHANGE_CASHIER',
          cashiers
        })
      }
    }

  /**
   * @desc 获取最近的提醒事项
   * @return {function(*, *)}
   */
  static getRecentlyReminds = () => {
    return async (dispatch , getState) => {
      const recentlyReminds = await HomeAPI.getReminds()
      dispatch({
        type:'GET_RECENTLY_REMINDS',
        recentlyReminds
      })
    }
  }

  /**
   * @desc 获取所有的提醒事项
   * @return {function(*, *)}
   */
  static getAllReminds = () => {
    return async (dispatch, getState) => {
      const allReminds = await  HomeAPI.getReminds('all')
      dispatch({
        type:'GET_ALL_REMINDS',
        allReminds
      })
    }
  }

  /**
   * @desc 获取最近三日的账单
   * @return {function(*, *)}
   */
  static getRecentlyAccount = () => {
    return async (dispatch,getState) => {
      const recentlyAccounts = await  HomeAPI.getAccountsWithoutSpecific('recently')
      dispatch({
        type:'GET_RECENTLY_ACCOUNT_RECORD',
        recentlyAccounts
      })
    }
  }

  /**
   * @desc 获取所有的账单记录
   * @return {function(*, *)}
   */
  static getAllAccount = () => {
    return async (dispatch, getState) => {
      const allAccounts = await  HomeAPI.getAccountsWithoutSpecific('all')
      dispatchAction({
        type:'GET_ALL_ACCOUNT_RECORD',
        allAccounts
      })
    }
  }




}

class GlobalActions {
  /**
   * @desc 获取货物名称列表
   * @param year
   * @return {function(*, *)}
   */
  static  getCargoList = () => {
    return async (dispatch , getState) => {
      const cargoNameList = await GlobalAPI.getCargoList()
      dispatch({
        type:'GET_CARGO_NAME_LIST',
        cargoNameList
      })
    }
  }

  static getClientList = () => {
    return async (dispatch,getState) => {
      const clientList = await GlobalAPI.getClientList()
      dispatch({
        type:'GET_CLIENT_LIST',
        clientList
      })
    }
  }
}

export {
  HomeActions,
  GlobalActions
}