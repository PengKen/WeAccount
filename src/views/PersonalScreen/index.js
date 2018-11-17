/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import renderIcon  from '../../icons/renderIcon'
import {scaleSize} from "../../utils/px2pt";
import Mask from '../../components/Mask'
type Props = {};
export default class PersonalScreen extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      title:'Persoanl'
    }
  }



  static navigationOptions = {
    tabBarIcon: (tab) =>  renderIcon(tab,'PERSONAL')
  };
  componentDidMount(){
    console.log("personal")
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30, color: 'red'}} onPress={() => this.setState({title:this.state.title + 1})}>ADD</Text>
        <Text>{this.state.title}</Text>
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
