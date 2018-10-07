function balance(initialState = {balance:0},action){
  switch (action.type){
    case 'add':
      return {
        ...initialState,
        balance:action.payload
      }
    case 'desc':
      return {
        ...initialState,
        balance:initialState.account-1
      }

  }
  return initialState
}

export default balance