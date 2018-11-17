/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import {scaleSize} from "../../utils/px2pt";
type Props = {};
export default class AccountList extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      title:'Persoanl'
    }
  }

  render() {
    return (
      <View style={styles.container}>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    position:'relative',
    backgroundColor:'#EDEDED',
    zIndex:1,
    height:scaleSize(812)
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
