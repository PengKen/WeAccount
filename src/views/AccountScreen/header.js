/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, StatusBar} from 'react-native';
import {Search,More} from "../../icons/Account";
import {scaleSize} from "../../utils/px2pt";
import { connect } from 'react-redux';
import TopSafeView from '../../components/SafeView'
import {IS_IPHONEX,THEME_COLOR} from '../../utils/constant'
import Route from '../../utils/route'
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
    const currenRoute =  Route.getCurrentRoute()
    return  currenRoute === 'Account' || currenRoute === 'Report' ?  true : false
   }
  componentWillMount(){

  }
  render() {


    const currenRoute =  Route.getCurrentRoute()
    return (
      <View style={styles.container}>
        <TopSafeView/>
        <View style={styles.header}>
          <Search/>
          <View style={styles.headerIndex}>
            <View style={[styles.headerIndexBills,(currenRoute === 'Account') ? styles.backgroundChooseColor : null]}>
              <Text
                onPress = { this.goToAccount }
                style={ (currenRoute=== 'Account') ?  styles.textChoosenColor : styles.textColor}>
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
    backgroundColor:'white'
  },
  header:{
    marginTop:IS_IPHONEX ? 0 : scaleSize(30) ,
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
    borderRightColor:THEME_COLOR

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
