
import HttpUtil from '../utils/httpUtil'
import {DEVICE_INFO} from "../utils/constant";
import TimeUtil from '../utils/timeUtil'
class GlobalAPI{


    /**
     * @desc 登录
     * @param data { phone, password, deviceInfo, lastLoginTime } // lastLoginTime其实就是当前时间
     * @return token
     */

  static login = (data) => {
      var data = {...data,DEVICE_INFO,lastLoginTime:TimeUtil.getCurrentFullTime()}
      return HttpUtil.fetch('logins','POST',data)
  }


  /**
   @desc 获取账户的货物列表
   @params null
   @return [{cargoName}]
   */
  static getCargoList = () => {
    return  HttpUtil.fetch("cargo_lists/"+1)
  }

  /**
   * @desc 获取用户的客户列表
   * @return [{clientId,name,phone,addTime}]
   */
  static getClientList = () => {
    return  HttpUtil.fetch("client_lists/"+1)
  }



}


export default GlobalAPI