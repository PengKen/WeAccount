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
          <Text>Home</Text>
          <AuthButton />
        <Mask />
        </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#EDEDED',
    flex:1,
    justifyContent:'center'

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
