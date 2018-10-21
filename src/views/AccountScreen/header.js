/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,StatusBar} from 'react-native';
import {Search,More} from "../../icons/Account";
import {scaleSize} from "../../utils/px2pt";
import { connect } from 'react-redux';
type Props = {};
 class AccountHeader extends Component<Props> {

  goToAccount = () => {
    this.props.navigation.dispatch({type:'Account'})
  }

  goToReport = () => {
    this.props.navigation.dispatch({type:'Report'})
  }

  shouldComponentUpdate(nextProps,nextState){
    /*
        不在账单导航栏内，header不需要重新render
     */
   return  nextProps.nav.index == 1 ? true : false
   }
  componentWillMount(){

  }
  render() {
    let RootRoute = this.props.nav ? this.props.nav.routes[this.props.nav.index] : null
    let currenRoute = null
    RootRoute.index &&  (currenRoute =  RootRoute.routes[RootRoute.index].routeName)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Search/>
          <View style={styles.headerIndex}>
            <View style={[styles.headerIndexBills,(currenRoute === 'Account' || currenRoute === null) ? styles.backgroundChooseColor : null]}>
              <Text
                onPress = { this.goToAccount }
                style={ (currenRoute=== 'Account' || currenRoute === null) ?  styles.textChoosenColor : styles.textColor}>
                {"账单"}
                </Text>
            </View>
            <View style={[styles.headerIndexReport,currenRoute === 'Report' ? styles.backgroundChooseColor : null]}>
              <Text
                onPress = {this.goToReport}
                style={
                  currenRoute === 'Report' ? styles.textChoosenColor :styles.textColor }>
                {"报表"}
                </Text>
            </View>
          </View>

          <More/>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AccountHeader)

const styles = StyleSheet.create({
  container: {

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
    borderRightColor:"#4A90E2"

  },
  headerIndexReport:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    height:scaleSize(25),
  },
  backgroundChooseColor:{
    backgroundColor:'#4A90E2'
  },
  textColor:{
    color:'#4A4A4A'
  },
  textChoosenColor:{
    color:'white',

  },
  //标题被选中要呈现白色,

});
