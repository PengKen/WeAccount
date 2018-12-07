/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,StatusBar,TouchableOpacity,FlatList} from 'react-native';
import {Search,More,Filter} from "../../icons/Account";
import {SmallMore} from "../../icons/common";
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import {BUY_COLOR, IS_IPHONEX, SELL_COLOR, THEME_COLOR} from '../../utils/constant'
import Mask from '../../components/Mask'
import AccountItem from '../../components/AccountItem'
import TimeUtil from '../../utils/timeUtil'
type Props = {};

class AccountScreen extends Component {

    componentDidMount() {

    }

    render(){
      return (
          <View style={styles.container}>
              <StatusBar
                  animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                  hidden={false}  //是否隐藏状态栏。
                  backgroundColor={'green'} //状态栏的背景色
                  translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏内部绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                  barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content')
              >
              </StatusBar>


              {
                  /*
                    账单详情
                 */
              }
              <ScrollView style={styles.accountDetail}>
                  <View style={styles.remind}>
                      <View style={styles.contentHeader}>
                          <Text style={{fontSize:scaleSize(12)}}>{"本月新增账单"}</Text>
                          <SmallMore style={styles.contentHeaderMore}></SmallMore>
                      </View>
                      <FlatList
                          data={[1,2,3,4]}
                          renderItem={ ( item ) =>
                              <View>
                                  <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-around'}}>
                                      <View style={{flex:0,justifyContent:'space-around',alignItems:'center'}}>
                                          <Text style={{fontSize:scaleSize(18)}}>{TimeUtil.getCurrentYear()+'月'}</Text>
                                          <Text style={{fontSize:scaleSize(12)}}>{TimeUtil.getCurrentYear()+'年'}</Text>
                                      </View>
                                      <View style={{flex:0,justifyContent:'center',alignItems:'center'}}>
                                          <Text style={{fontSize:scaleSize(15),paddingBottom:scaleHeightSize(1)}}>买入</Text>
                                          <Text style={{color:BUY_COLOR}}>¥6222.1</Text>
                                      </View>
                                      <View style={{flex:0,justifyContent:'center',alignItems:'center'}}>
                                          <Text style={{fontSize:scaleSize(15),paddingBottom:scaleHeightSize(1)}}>卖出</Text>
                                          <Text style={{color:SELL_COLOR}}>¥6222.1</Text>
                                      </View>

                                      <Text>结余</Text>

                                      <AccountItem item={item} />
                                  </View>





                              </View>}



                      />
                  </View>
              </ScrollView>
              <Mask />
          </View>
      )
    }
}



export default AccountScreen

const styles = StyleSheet.create({
  container: {

  },


  dateSelect:{
    width:scaleSize(40),
    height:scaleSize(17),
    borderRadius:scaleSize(3),
    marginBottom: 5,
    flex:0,
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#4A90E2',
    alignItems:'center'
  },
  dateSelectIndex:{
    flex:0,
    flexDirection:'row',
  },
  dateSelectMonth:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    height:scaleSize(17),
    borderRightWidth:1,
    borderRightColor:THEME_COLOR
  },
  dateSelectYear:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    height:scaleSize(17)
  },
  filter:{
    flex:0,
    flexDirection:'row',

  },
  accountDetail:{
    marginTop:scaleSize(6),
    paddingTop:scaleSize(5),
    paddingRight:scaleSize(5),
    paddingLeft:scaleSize(5),
    paddingBottom:scaleSize(100),
    marginLeft:scaleSize(5),
    marginRight:scaleSize(5),
    backgroundColor:'#F5F5F5',
    borderRadius: scaleSize(3),
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1

    },
    shadowColor: "#000",
  },
  contentHeader:{
    borderLeftWidth:4,
    borderLeftColor:THEME_COLOR,
    marginLeft:scaleSize(12),
    marginTop:scaleSize(5),
    marginBottom:scaleHeightSize(15),
    paddingTop:scaleSize(3),
    paddingBottom:scaleSize(3),
    paddingLeft:scaleSize(12),
    paddingRight:scaleSize(15),
    flex:0,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
});
