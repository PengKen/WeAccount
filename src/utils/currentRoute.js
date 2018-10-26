

import {Store} from '../../App'
class Route {
  /**
   * @desc 获取当前路由
   * @return {string}
   */
  static getCurrentRoute = () => {
    const nav = Store.getState().nav
    return Route.recursive(nav)
  }
  static recursive = (obj) => {
    if(obj['routes']){
      return Route.recursive(obj.routes[obj.index])
    }else {
      return obj.routeName
    }
  }



}
export default Route