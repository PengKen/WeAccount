/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import MeunScreen from './Menu'
import BuyScreen  from  './Buy'
import SellScreen from './Sell'
import ClientsScreen from './Clients'
import  renderIcon  from '../../icons/renderIcon'
import {Store} from '../../../App'
import {createStackNavigator, NavigationActions} from 'react-navigation';
import {connect} from "react-redux";
import maskAction from '../../store/actions/maskAction'
import ImagesViewer from '../CommonScreen/ImageViewerScreen'

/**
 * Store是一个对象
 *
 * {
        //执行createStore其实返回的就是这些东东

    }dispatch,       //触发action去执行reducer，更新state
 subscribe,     //订阅state改变，state改变时会执行subscribe的参数（自己定义的一个函数）
 getState,      //获取state树
 replaceReducer,       //替换reducer
 [$$observable]: observable
 //redux内部用的，对我们来说没用
 */



const tapTab  = (obj,props) => {
  const isShowMask = Store.getState().MASK.isShowMask //当前mask的状态
  Store.dispatch(maskAction(isShowMask))//现实浮层

}

const AddStack = createStackNavigator({
  Menu:MeunScreen,
  Sell:SellScreen ,
  Buy:BuyScreen,
  Clients: ClientsScreen,
  ImagesViewerScreen: ImagesViewer
});
AddStack.navigationOptions = ({ navigation }) => {
  /*
  设置了嵌套的导航页的Icon要拿出到navigation中单独配置
 */

  return {
    tabBarIcon: (tab) =>  renderIcon(tab,'ADD'),
    tabBarVisible: navigation.state.index > 0 ? false : true,//跳转到详情页要隐藏tabbar
    tabBarOnPress:(obj)=> tapTab(obj,navigation.getParam('isShowMask'))
  };
};
export default AddStack
