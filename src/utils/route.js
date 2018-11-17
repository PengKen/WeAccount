

import {Store} from '../../App'
class Route {

  static prevRoutes = []

  /**
   * @desc 获取当前路由
   * @return {string}
   */
  static getCurrentRoute = () => {
    const nav = Store.getState().nav
    Route.prevRoutes = []
    Route.recursive(nav)
    return Route.prevRoutes[Route.prevRoutes.length-1]
  }

  /**
   * @desc 获取之前的路由
   * @param nth ，如：0 表示 获取当前路由，1 表示上一条路由，2 表示前两条路由，依次类推
   * @return {string} routeName 路由名
   */

  static getPrevRoute = (nth) => {
    const nav = Store.getState().nav
    Route.prevRoutes = []
    Route.recursive(nav)
    return Route.prevRoutes[Route.length-1-nth]
  }

  /**
   * @desc 用来返回上一个TAB页，已解决菜单item返回的问题
   * @return {*}
   */
  static getPrevTap = () => {
    const tabHistory = Store.getState().TABHISTORY.list
    return tabHistory[tabHistory.length-1]
  }


  static recursive = (obj) => {
    if(obj['routes']){
       Route.prevRoutes.push(obj['routes'][obj.index].routeName)
      return Route.recursive(obj.routes[obj.index])
    }else {
      Route.prevRoutes.push(obj.routeName)
    }
  }


}
export default Route