/**
 默认导出TabNavigator组件给index.js
 */
import HomeScreen from './HomeScreen'
import AccountScreen from './AccountScreen'
import AddScreen from './AddScreen'
import FoundScreen from './FoundScreen'
import PersonalScreen from './PersonalScreen'
import React from "react";
import {createBottomTabNavigator, createStackNavigator,TabNavigator,createSwitchNavigator} from 'react-navigation'

  import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {View,Text} from 'react-native'
// const middleware = createReactNavigationReduxMiddleware(
//   /*
//     所有的路由跳转都会经过这些中间件
//    */
//   'root',
//   // state => state.nav,
//   state => state.nav
// );

import {FilterDrawer} from './AccountScreen/filter'


const TabNavigatorScreen = createBottomTabNavigator(
  {
    TAB_HOME: {
      screen: HomeScreen,
    },
    TAB_ACCOUNT: {
      screen: AccountScreen

    },
    TAB_ADD:{
      screen: AddScreen
    },
    TAB_FOUND: {
      screen: FoundScreen
    },
    TAB_PERSONAL: {
      screen: PersonalScreen
    }
  },
  {
    tabBarPosition: 'bottom',             //设置标签栏位置
    animationEnabled: false,               //开启标签页切换动画
    swipeEnabled: true,                   //允许标签页之间滑动切换
    initialRouteName:'TAB_HOME',              //初始路由
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

const MainNavigator = createStackNavigator(
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
class Login extends React.Component{
    render(){
        return (
            <View style={{flex:1,justifyContent: 'center',alignItems:'center'}} ><Text onPress={() => this.props.navigation.navigate('App')}>123</Text></View>
        )
    }
}
const RootNavigator = createSwitchNavigator(
    {
        AuthLoading: Login,
        App: MainNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
// const AppWithNavigationState = reduxifyNavigator(MainNavigator, 'root');
const mapStateToProps = (state) => ({
  /*
     reducers需要在此注册，内部的navigation-action才能生效
   */
  state:state.nav
  // accountIndex:state.accountIndex
});
// const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);
export { RootNavigator, TabNavigatorScreen };