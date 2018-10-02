import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import mask from './mask'
import { RootNavigator } from '../views/config';

/**
 *  Navigation-state 指的是 object{ index ,routes:[]  }
 *  index 指的是当前的路由在所有routes中的哪一条 ，从0开始，
 *  routes指的是父级路由的所有子路由，routes里面也可以进一步嵌套
 */

  /**
   * @method getActionForPathAndParams
   * @desc 通过传入的目标的Path和需要伴随的参数，来获得action，请记住：
   * navigation中所有的 action 都是为了获得下一个Navigation-state
   */

  /**
   * @method getStateForAction
   * @desc 通过传入action 和 上一个 state（可能会有back，所以需要上一个state）
   *navigation 中的action 出了使用getActionForPathAndParams来获取还有最原始的API，如：
   * NavigationActions.back(),
   * NavigationActions.navigate(path)
   * NavigationActions.push()
   *
   * tips:以上几个api都是返回一个navigation-redux可以识别的action
   *
   */

const firstAction = RootNavigator.router.getActionForPathAndParams('HOME');

const firstNavState = RootNavigator.router.getStateForAction(firstAction);


/*
    既然用了navigation-redux，所有的路由控制都要放到redux中来管理，
    所以之前在TabBarConfig中定义的 initialRouteName 也变得无效了，
    因此，必须重新初始化一个 initialNavState
 */
const initialNavState = RootNavigator.router.getStateForAction(
  {}, // action
  firstNavState // state
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout2':

      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'PERSONAL' }),
        state
      );
      console.log(nextState)
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      console.log("abc")
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}



const AppReducer = combineReducers({
  nav,
  // auth,
  mask
});

export default AppReducer;