/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,StatusBar} from 'react-native';
import {Search,More,Filter} from "../../icons/Account";
import {SmallMore} from "../../icons/common";
import {scaleSize} from "../../utils/px2pt";
import {IS_IPHONEX,THEME_COLOR} from '../../utils/constant'

type Props = {};
export default class AccountScreen extends Component<Props> {
  // static navigationOptions = {
  //   tabBarLabel: '账单',
  //   tabBarIcon: (tab) =>  renderIcon(tab,'ACCOUNT')
  // };

  render() {




    return (
      <View style={styles.container}>
        <Text>{"report"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  header:{
    marginTop:scaleSize(30),
    flex:0,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:scaleSize(12),
    paddingRight:scaleSize(12)
  },
  headerIndex: {
    width:scaleSize(105),
    height:scaleSize(25),
    borderRadius:scaleSize(3),
    marginBottom: 5,
    flex:0,
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#4A90E2',
    alignItems:'center'
  },
  headerIndexBills:{
    flex:1,
    borderRightWidth:1,
    justifyContent:'center',
    flexDirection:'row',
    height:scaleSize(25),
    alignItems:'center',
    borderRightColor:THEME_COLOR

  },
  headerIndexReport:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    height:scaleSize(25),
  },
  back:{
    backgroundColor:'#4A90E2'
  },
  textColor:{
    color:'#4A4A4A'
  },
  textChoosenColor:{
    color:'white'
  },
  //标题被选中要呈现白色,
  lineAccount: {
    marginTop: scaleSize(8),
    backgroundColor: "#F5F5F5",
    height: scaleSize(320),
    borderRadius: scaleSize(3),
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1

    },
    shadowColor: "#000",
    marginLeft:scaleSize(5),
    marginRight:scaleSize(5),
    paddingLeft:scaleSize(5),
    paddingRight:scaleSize(5),
    paddingBottom:scaleSize(5)
  },
  lineAccountHeader:{
    flex:0,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:scaleSize(15),
    paddingLeft:scaleSize(15),
    paddingRight:scaleSize(15)
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
    alignItems:'center'
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
    height:scaleSize(200),
    shadowColor: "#000",
  },
  contentHeader:{
    borderLeftWidth:4,
    borderLeftColor:THEME_COLOR,
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
});
