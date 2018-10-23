
/*
  返回当前导航组件的routeName
 */
import {Store} from '../../App'
class Route {
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