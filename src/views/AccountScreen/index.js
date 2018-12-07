/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,StatusBar} from 'react-native';
import renderIcon from '../../icons/renderIcon'
import Account from './account'
import Report from './report'
import AccountHeader from './header'
import FilterScreen from './filter'
import {createMaterialTopTabNavigator, createDrawerNavigator,SafeAreaView,TabNavigator,TabBarBottom} from 'react-navigation'
type Props = {};



 const AccountTapNavigator =  createMaterialTopTabNavigator(
  {
    Account: { screen:Account },
    Report: { screen: Report },
    // Filter:{screen: FilterDrawer}
  },
   {
     tabBarComponent:AccountHeader,
     tabBarPosition: 'top',
     initialRouteName:'Account',
     tabBarOptions: {
       activeTintColor: 'tomato',
       inactiveTintColor: 'gray',
     },
     animationEnabled: true,
     swipeEnabled: true
   })





  /*
      Account 顶部的tab页面嵌套在Drawer页面中，
      才可以唤出作为抽屉页的FilterScreen
  */

const AccountNav = createDrawerNavigator(
  {
    Account:AccountTapNavigator,

  },
  {
    drawerWidth: 300, // 抽屉宽
    drawerPosition: 'right', // 抽屉在左边还是右边
    contentComponent: FilterScreen,  // 自定义抽屉组件
    contentOptions:{
      initialRouteName: 'Notifications', // 默认页面组件
      //activeItemKey:'Notifications',
      //    labelStyle:{
      //    //标签样式
      //    // color : 'red',
      //    height : 30
      //  },
      //  activeTintColor: 'white',  // 选中文字颜色
      // activeBackgroundColor:'#ff8500', // 选中背景颜色
      //    inactiveTintColor:'#666',  // 未选中文字颜色
      //    inactiveBackgroundColor:'#fff', // 未选中背景颜色
      //    style:{  // 样式
      //    marginVertical: 0
      //  },
      //  //没有作用
      onItemPress:(route) => {
        console.log('-------->' + JSON.stringify(route))
        //  },

      }
    }
  })
AccountNav.navigationOptions = ({ navigation }) => {
  /*
  设置了嵌套的导航页的Icon要拿出到navigation中单独配置
 */
  return {
    tabBarIcon: (tab) =>  renderIcon(tab,'ACCOUNT')
  };
};
// export default AccountTapNavigator
export default AccountNav