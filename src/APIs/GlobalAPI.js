
import HttpUtil from '../utils/httpUtil'

class GlobalAPI{




  static login = (data) => {
      return HttpUtil.fetch('login','POST',data)
  }


  /**
   @desc 获取账户的货物列表
   @params null
   @return [{cargoName}]
   */
  static getCargoList = () => {
    return  HttpUtil.fetch("cargo_list/"+1)
  }

  /**
   * @desc 获取用户的客户列表
   * @return [{clientId,name,phoneNumber,addTime}]
   */
  static getClientList = () => {
    return  HttpUtil.fetch("client_list/"+1)
  }



}


export default GlobalAPI