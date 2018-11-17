/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import renderIcon from '../../icons/renderIcon'
import { NavigationActions } from 'react-navigation';
import Mask from '../../components/Mask'
type Props = {};

export default class FoundScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarIcon: (tab) =>  renderIcon(tab,'FOUND')
    }

  };
  componentWillMount(){

  }
  componentDidMount(){
    console.log("found")
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          <Text>1</Text>
          <Text>2</Text>
        </Text>
        <Mask />
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
