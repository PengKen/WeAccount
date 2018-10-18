/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,StatusBar,NativeModules} from 'react-native';
import { renderIcon } from '../config'
import Mask from '../../components/Mask'
import AuthButton from '../../components/NavButton'
import {scaleSize,setSpText} from "../../utils/px2pt";
import { connect } from 'react-redux';
const { StatusBarManager } = NativeModules;
import CountUp from '../../components/CountUp'

//头部的icon
import {Triangle,Search,Setting,More} from "../../icons/Home";

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
    let count = new CountUp('balance','200','3000',2,2)
    count.start()
  }
  componentWillMount(){

  }
  render() {
    return (
      <View style={styles.container} >
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={false}  //是否隐藏状态栏。
          backgroundColor={'green'} //状态栏的背景色
          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏内部绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
        >
        </StatusBar>

        <View style={styles.header}>
          <View style={styles.headerButtons}>
            <View style={styles.date}>
              <Text style={[styles.tips,{paddingRight:scaleSize(5)}]}>{ "5 / 2018" }</Text>
              <Triangle />
            </View>
            <View style={styles.more}>
              <Search style={{paddingRight:scaleSize(10)}}/>
              <Setting />
            </View>


          </View>

          <View style={styles.wrapper}>
            <Text style={styles.tips}>{"当前总资产（元）"}</Text>
            <Text style={styles.balance}>{"¥" + this.props.balance}</Text>
            <View style={styles.bottomTips}>
              <View style={{paddingTop:scaleSize(10)}}>
                <Text style={styles.tips}>{"本月支出（元）¥ 888.00"}</Text>
              </View >
              <View style ={{paddingTop:scaleSize(10)}}>
                <Text style={styles.tips}>{"本月收入（元）¥ 88888.00"}</Text>
              </View>
            </View>
          </View>

        </View>
        <ScrollView style={styles.content}>
          <View style={styles.remind}>
            <View style={styles.contentHeader}>
              <Text>{"近期提醒"}</Text>
              <More style={styles.contentHeaderMore}></More>
            </View>
          </View>
          <View style={styles.recentlyAccounts}>
            <View style={styles.contentHeader}>
              <Text>{"最近三日账单"}</Text>
              <More style={styles.contentHeaderMore}></More>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor:'#EDEDED',
    flex:1
  },
  header:{
    width:scaleSize(375),
    height:scaleSize(184),
    backgroundColor:'#4A90E2',

  },
  headerButtons:{
    marginTop:scaleSize(25),
    marginLeft:scaleSize(12),
    marginRight:scaleSize(12),
    flex:1,
    flexDirection:'row',
  },
  date:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'

  },
  more:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    alignSelf:'flex-end'
  },
  wrapper:{
    marginTop:scaleSize(10),
    marginLeft:scaleSize(12),
    marginRight:scaleSize(12),
    flex:5,
  },
  tips:{
    fontSize:scaleSize(11),
    color:'white',
    fontWeight:"700",

    height:scaleSize(12)
  },

  balance:{
    color:'white',
    fontSize:scaleSize(36),
    lineHeight:scaleSize(49),
    fontWeight:"700"
  },
  bottomTips:{
    color:'red',
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  content:{
    paddingTop:scaleSize(5),
    paddingRight:scaleSize(5),
    paddingLeft:scaleSize(5),
    paddingBottom:scaleSize(100)
  },
  contentHeader:{
    borderLeftWidth:4,
    borderLeftColor:"#4A90E2",
    marginLeft:scaleSize(12),
    marginTop:scaleSize(5),
    paddingTop:scaleSize(3),
    paddingBottom:scaleSize(3),
    paddingLeft:scaleSize(15),
    paddingRight:scaleSize(15),
    flex:0,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  contentHeaderMore:{
    flexDirection:'row',
    alignSelf:'center',
  },
  remind:{
    backgroundColor:"white",
    height:scaleSize(300),
    borderRadius:scaleSize(3),
    shadowOpacity:0.5,
    shadowOffset:{
      width:1,
      height:2

    },
    shadowColor:"#000"
  },
  recentlyAccounts:{
    backgroundColor:"white",
    height:scaleSize(500),
    borderRadius:scaleSize(3),
    shadowOpacity:0.5,
    shadowOffset:{
      width:1,
      height:2
    },
    shadowColor:"#000",
    marginTop:scaleSize(5),
  },

});

 export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)