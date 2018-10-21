/**
 默认导出TabNavigator组件给index.js
 */
import HomeScreen from './HomeScreen'
import AccountScreen from './AccountScreen'
import AddScreen from './AddScreen'
import FoundScreen from './FoundScreen'
import PersonalScreen from './PersonalScreen'
import React from "react";
import {createBottomTabNavigator, createStackNavigator,TabNavigator} from 'react-navigation'
import { HOME,ACCOUNT,FOUND,PERSONAL,ADD }from '../icons/buttonNavigation'
  import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
const middleware = createReactNavigationReduxMiddleware(
  /*
    所有的路由跳转都会经过这些中间件
   */
  'root',
  // state => state.nav,
  state => state.nav
);
const switchNav = function (component:string ,currentTarget:string) {

  switch(component){
    case 'HOME':
      return( <HOME currentTarget={currentTarget} /> );
    case 'ACCOUNT':
      return (<ACCOUNT currentTarget={currentTarget} />) ;
    case 'FOUND' :
      return (<FOUND currentTarget={currentTarget} /> );
    case 'PERSONAL':
      return (<PERSONAL currentTarget={currentTarget} />) ;
    case 'ADD':
      return <ADD currentTarget={currentTarget} /> ;
  }
}

export function renderIcon(tab, component) {
  if (tab.focused) {//标签激活状态下icon的路径
    return switchNav(component,component)
  } else {                                  //未激活状态下的icon
    return switchNav(component,'NO_SELCETED')
  }
}
import {FilterDrawer} from './AccountScreen/filter'


const TabNavigatorScreen = createBottomTabNavigator(
  {
    HOME: {
      screen: HomeScreen,
    },
    ACCOUNT: {
      screen: AccountScreen

    },
    ADD:{
      screen: AddScreen
    },
    FOUND: {
      screen: FoundScreen
    },
    PERSONAL: {
      screen: PersonalScreen
    }
  },
  {
    tabBarPosition: 'bottom',             //设置标签栏位置
    animationEnabled: false,               //开启标签页切换动画
    swipeEnabled: true,                   //允许标签页之间滑动切换
    initialRouteName:'HOME',              //初始路由
    tabBarOptions: {
                      //允许标签页之间滑动切换
      //当前选中的tab bar的文本颜色和图标颜色
      activeTintColor: '#4A90E2',
      //当前未选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: '#000',
      //是否显示tab bar的图标，默认是false
      showIcon: true,
      //showLabel - 是否显示tab bar的文本，默认是true
      showLabel: false,
      //是否将文本转换为大小，默认是true
      upperCaseLabel: false,
      //material design中的波纹颜色(仅支持Android >= 5.0)
      pressColor: '#788493',
      //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
      pressOpacity: 1,
      //tab bar的样式
      style: {
        backgroundColor: '#fff',
        paddingBottom: 1,
        borderTopWidth: 0.2,
        paddingTop:1,
        borderTopColor: '#ccc',
      },
      //tab bar的文本样式
      labelStyle: {
        fontSize: 11,
        margin: 1
      },
      //tab 页指示符的样式 (tab页下面的一条线).
      indicatorStyle: {height: 0},
      // //是否懒加载
      lazy: false,
      // //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
      backBehavior: 'none',
    },
    //tab bar的位置, 可选值： 'top' or 'bottom'
    // tabBarPosition: 'bottom',
    // //是否允许滑动切换tab页
    // swipeEnabled: true,
    // //是否在切换tab页时使用动画
    // animationEnabled: true,


  });

const RootNavigator = createStackNavigator(
  {
    Main:{
      screen:TabNavigatorScreen,
      navigationOptions:{
        header:null,

      }
    },
    // Drawer:{
    //   screen:FilterDrawer,
    //   navigationOptions:{
    //     drawerWidth: 100,
    //     // header:null,
    //
    //   }
    // },
  },

)
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');
const mapStateToProps = (state) => ({
  /*
     reducers需要在此注册，内部的navigation-action才能生效
   */
  state:state.nav
  // accountIndex:state.accountIndex
});
const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);
export { RootNavigator, AppNavigator, middleware,TabNavigatorScreen };