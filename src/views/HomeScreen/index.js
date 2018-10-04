/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import { renderIcon } from '../config'
import Mask from '../../components/Mask'
import AuthButton from '../../components/NavButton'
import {scaleSize} from "../../utils/px2pt";

type Props = {};

export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: (tab)=>renderIcon(tab,'HOME'),

    // title：标题，会同时设置导航条和标签栏的title
    //tabBarVisible:false

  };
  componentWillMount(){
    console.log("home")
  }
  render() {
    return (

        <View style={styles.container}>
          <View style={styles.header}>

          </View>
          <Mask />
          {/* Mask浮层只需要在一个view中注册就可以了 */}
        </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#EDEDED'

  },
  header:{
    width:scaleSize(375),
    height:scaleSize(184),
    backgroundColor:'#4A90E2'
  }
});
