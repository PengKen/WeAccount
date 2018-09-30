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
type Props = {};
import Mask  from '../../components/Mask'
const switchNav = function (component:string ,currentTarget:string) {

  switch(component){
    case 'HOME':
      return( <HOME currentTarget={currentTarget} /> );
    case 'ACCOUNT':
      return (<ACCOUNT currentTarget={currentTarget} />) ;
    case 'FOUND' :
      return (<FOUND currentTarget={currentTarget} /> );
    case 'PERSONAL':
      return (<PERSONAL currentTarget={currentTarget} />) ;
    case 'ADD':
      return <ADD currentTarget={currentTarget} /> ;
  }
}
const tapTab  = (obj,navigation) => {
  console.log(obj)
  console.log(navigation)
  navigation.setParams({visible:true})
  // navigation.navigate(obj.previousScene.key)
}
export default class AddScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      showLable:false,
      tabBarIcon: (tab) =>  renderIcon(tab,'ADD'),
      tabBarOnPress:(obj)=> tapTab(obj,navigation)
    }

  };
  componentWillMount(){
    this.props.navigation.navigate('FOUND')
  }
  componentDidMount(){
  }
  render() {
    return (
      <View></View>

      // <Mask visible={ this.props.navigation.getParam('visible')}></Mask>
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
