/**
 * @desc 全局的reducer，用来保存该用户的个人信息，如用户名，密码，货物名称列表，客户列表等特色化的数据
 * @param initialState
 * @param action
 * @return {{cargoList: *[], cargoNameList: *}}
 */

function global(initialState = {
  cargoNameList:[''],
  clientList:['']
  },action) {
  switch (action.type){
    case 'GET_CARGO_NAME_LIST':{
      return {
        ...initialState,
          cargoNameList:action.cargoNameList
      }
    }
    case 'GET_CLIENT_LIST':{
      return {
        ...initialState,
        clientList:action.clientList
      }
    }
    default:
      return initialState
  }
}
export default global