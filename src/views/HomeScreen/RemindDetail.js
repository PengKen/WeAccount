/**
 * @desc 最近提醒的详情页
 */
import React, {Component} from 'react';
import {View,Text} from 'react-native'
import {TopSafeView} from "../../components/SafeView";
import {IS_IPHONEX, THEME_COLOR} from "../../utils/constant";
import {renderIcon} from "../config";

class RemindDeatil extends  Component{
  static navigationOptions = {

    title:"详情", //会同时设置导航条和标签栏的title
    headerStyle: {
      backgroundColor: THEME_COLOR,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };
  render(){
    return (
      <View>
        <Text>{this.props.navigation.getParam('key')}</Text>
      </View>
    )
  }
}

export default RemindDeatil