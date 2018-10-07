function balance(initialState = {account:0},action){
  switch (action.type){
    case 'add':
      return {
        ...initialState,
        account:initialState.account+1
      }
    case 'desc':
      return {
        ...initialState,
        account:initialState.account-1
      }

  }
  return initialState
}

export default balance