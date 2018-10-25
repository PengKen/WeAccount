import HttpUtil from '../../utils/httpUtil'

/*
    react-thunk 的作用其实就是改变传统的dispacth的参数只能是一个对象的现状，
    通过react-thunk 可以 使得dispatch的参数是一个对象或者是函数，如下面的getAccount最终返回的是一个函数
    但我们仍可以通过dipacth(getAccount())

    react-thunk的核心源码：

    function createThunkMiddleware(extraArgument) {
      return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
       }
       return next(action);
  };
}
 */
function getAccount(url){
  return async (dispatch,getState) => {

    await HttpUtil.get(url)
    dispatch({
      type: 'ADD_TODO',
      id: 1,
      text
    })
  }
}

export {
  getAccount
}