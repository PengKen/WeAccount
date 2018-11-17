
import HttpUtil from '../utils/httpUtil'

class GlobalAPI{
  /**
   @desc 获取账户的货物列表
   @params null
   @return [{cargoName}]
   */
  static getCargoList = () => {
    return  HttpUtil.get("cargo_list/"+1)
  }

  /**
   * @desc 获取用户的客户列表
   * @return [{clientId,name,phoneNumber,addTime}]
   */
  static getClientList = () => {
    return  HttpUtil.get("client_list/"+1)
  }



}


export default GlobalAPI