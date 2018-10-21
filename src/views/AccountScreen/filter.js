/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button,StatusBar} from 'react-native';
import {renderIcon} from '../config'
import {Search, More, Filter} from "../../icons/Account";
import {SmallMore} from "../../icons/common";
import {scaleSize} from "../../utils/px2pt";
import {createDrawerNavigator,SafeAreaView,DrawerItems, createStackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'
import Header from './header'
import {connect} from 'react-redux';
import Account from './index'
import {TabNavigatorScreen} from '../config'
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
const MyNotificationsScreen = ({navigation}) => (
  <View>
    <Button
      onPress={() => navigation.toggleDrawer()}
      title="MyNotificationsScreen ---> open drawer  "
    />
    <Text></Text>
  </View>
);


MyNotificationsScreen.navigationOptions = {
  drawerLabel: 'Notifications',
  drawerIcon: () => (
    <View>
      <Text>{"notification"}</Text>
    </View>

  ),
}

type Props = {};

class FilterScreen extends Component<Props> {


  componentWillMount() {

  }

  render() {

    return (
      <View style={styles.container}>
        <Text>{"Drawer"}</Text>
      </View>
    )
  }
}


const FilterDrawer = createDrawerNavigator(
  {

    Notifications:{
      screen: MyNotificationsScreen
    },

  },
  {
    drawerWidth: 100, // 抽屉宽
    drawerPosition: 'right', // 抽屉在左边还是右边
     contentComponent: FilterScreen,  // 自定义抽屉组件
    contentOptions:{
      initialRouteName: 'Notifications', // 默认页面组件
      //activeItemKey:'Notifications',
   //    labelStyle:{
   //    //标签样式
   //    // color : 'red',
   //    height : 30
   //  },
   //  activeTintColor: 'white',  // 选中文字颜色
   // activeBackgroundColor:'#ff8500', // 选中背景颜色
   //    inactiveTintColor:'#666',  // 未选中文字颜色
   //    inactiveBackgroundColor:'#fff', // 未选中背景颜色
   //    style:{  // 样式
   //    marginVertical: 0
   //  },
   //  //没有作用
    onItemPress:(route) => {
      console.log('-------->' + JSON.stringify(route))
   //  },

    }
  }
})

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(FilterScreen)

export {FilterScreen, FilterDrawer}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
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
    borderRightColor: "#4A90E2"

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
