function ACCOUNT(initialState = {
    currentMonthAccounts:[]


    },action){
    switch (action.type){
        case 'GET_CURRENT_MONTH_ACCOUNT_RECORD':
            return {
                ...initialState,
                currentMonthAccounts:action.currentMonthAccounts
            }

    }
    return initialState
}

export default ACCOUNT