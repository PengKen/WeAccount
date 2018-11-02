/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import { HOME,ACCOUNT,FOUND,PERSONAL,ADD }from '../../icons/buttonNavigation'
import { renderIcon } from '../config'
import {Store} from "../../../App"
import Mask  from '../../components/Mask'
import {connect} from "react-redux";
import maskAction from '../../store/actions/maskAction'
/**
 * Store是一个对象
 *
 * {
        //执行createStore其实返回的就是这些东东
        dispatch,       //触发action去执行reducer，更新state
        subscribe,     //订阅state改变，state改变时会执行subscribe的参数（自己定义的一个函数）
        getState,      //获取state树
        replaceReducer,       //替换reducer
        [$$observable]: observable
        //redux内部用的，对我们来说没用
    }
 */
type Props = {};

const tapTab  = (obj,props) => {
  console.warn("tab")
  const isShowMask = Store.getState().mask.isShowMask //当前mask的状态
  // Store.dispatch(maskAction(isShowMask))
}
class AddScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    console.warn("add")
    return {
      showLable:false,
      tabBarIcon: (tab) =>  renderIcon(tab,'ADD'),
      tabBarOnPress:(obj)=> tapTab(obj,navigation.getParam('isShowMask'))
    }

  };

  render() {
    return (
      <View>
      </View>


    );
  }
}

const mapStateToProps = ({state}) => {
  return {
    isShowMask:state.mask.isShowMask
  }
}

const mapDispatchToProps = ({dispatch}) => {
  return {
    toggleMask: (type) => dispatch({type})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    position:'relative',
    backgroundColor:'#EDEDED',
    zIndex:1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);