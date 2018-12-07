/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button,StatusBar} from 'react-native';
import {Search, More, Filter} from "../../icons/Account";
import {SmallMore} from "../../icons/common";
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import {createDrawerNavigator,SafeAreaView,DrawerItems, createStackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'
import {IS_IPHONEX,THEME_COLOR} from '../../utils/constant'
import {connect} from 'react-redux';
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

type Props = {};

 class FilterScreen extends Component<Props> {


  componentWillMount() {

  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        {/*<StatusBar hidden={true}></StatusBar>*/}
        <View style={styles.content}>
          <Text>drawer</Text>
        </View>
      </SafeAreaView>
    )
  }
}



const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(FilterScreen)

export {FilterScreen}

const styles = StyleSheet.create({
  container: {

  },
  content:{
  },
  header: {
    marginTop: scaleSize(30),
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scaleSize(12),
    paddingRight: scaleSize(12)
  },
  headerIndex: {
    width: scaleSize(105),
    height: scaleSize(25),
    borderRadius: scaleSize(3),
    marginBottom: 5,
    flex: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4A90E2',
    alignItems: 'center'
  },
  headerIndexBills: {
    flex: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    height: scaleSize(25),
    alignItems: 'center',
    borderRightColor: THEME_COLOR

  },
  headerIndexReport: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: scaleSize(25),
  },
  backgroundChooseColor: {
    backgroundColor: '#4A90E2'
  },
  textColor: {
    color: '#4A4A4A'
  },
  textChoosenColor: {
    color: 'white',

  },
  //标题被选中要呈现白色,

});
