function HOME(initialState = {balance:0,recentlyReminds:[]},action){
  switch (action.type){
    case 'CHANGE_BALANCE':
      return {
        ...initialState,
        balance:action.balance
      }
    case 'GET_RECENTLY_REMINDS':
      return {
        ...initialState,
        recentlyReminds:action.recentlyReminds
      }
    case 'GET_ALL_REMINDS':
      return {
        ...initialState,
        allReminds:action.allReminds
      }
    case 'GET_RECENTLY_ACCOUNT_RECORD':
      return {
        ...initialState,
        recentlyAccounts:action.recentlyAccounts
      }
    case 'GET_ALL_ACCOUNT_RECORD':
      return {
        ...initialState,
        allAccounts:action.allAccounts
      }
  }
  return initialState
}

export default HOME