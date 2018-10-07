/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,StatusBar,NativeModules} from 'react-native';
import { renderIcon } from '../config'
import Mask from '../../components/Mask'
import AuthButton from '../../components/NavButton'
import {scaleSize} from "../../utils/px2pt";
import { connect } from 'react-redux';
const { StatusBarManager } = NativeModules;
import CountUp from '../../components/CountUp'
StatusBarManager.getHeight((statusBarHeight)=>{
  console.log(statusBarHeight)
})
type Props = {};

 class HomeScreen extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: (tab)=>renderIcon(tab,'HOME'),

    // title：标题，会同时设置导航条和标签栏的title
    //tabBarVisible:false

  };
  componentDidMount(){
    let count = new CountUp('balance','200','3000',2,2000)
    count.start()
  }
  componentWillMount(){
    console.log(" " +
      "fucking home")
  }
  render() {
    return (
      <View style={styles.container} ref="abc">
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={false}  //是否隐藏状态栏。
          backgroundColor={'green'} //状态栏的背景色
          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏内部绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
        >
        </StatusBar>
        <View style={styles.header}>
          <Text>{this.props.balance}</Text>
        </View>
        <Mask />
        {/* Mask浮层只需要在一个view中注册就可以了 */}
      </View>

 );
  }
}
const mapStateToProps = (state) => {
  return {
    balance:state.balance.balance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMask: (type) => dispatch({type})
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#EDEDED'

  },
  header:{
    width:scaleSize(375),
    height:scaleSize(184),
    backgroundColor:'#4A90E2',

  }
});

 export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)