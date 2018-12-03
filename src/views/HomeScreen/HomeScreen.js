/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet,TouchableHighlight,Image,Text,FlatList, View,ScrollView,StatusBar,NativeModules} from 'react-native';
import  renderIcon  from '../../icons/renderIcon'
import Mask from '../../components/Mask'
import ItemSeparatorComponent from '../../components/ItemSeparatorComponent'
import {scaleSize,scaleHeightSize} from "../../utils/px2pt";
import { connect } from 'react-redux';
import NoData from '../../components/NoData'
const { StatusBarManager } = NativeModules;
import {NavigationActions} from 'react-navigation'
import AccountItem from '../../components/AccountItem'
//头部的icon
import {Triangle,Search,Setting} from "../../icons/Home";
import {SmallMore} from "../../icons/common";
import TopSafeView from '../../components/SafeView'
import {IS_IPHONEX,THEME_COLOR} from '../../utils/constant'
import {GlobalActions, HomeActions} from "../../store/actions/fetchActions";
StatusBarManager.getHeight((statusBarHeight)=>{
  console.log(statusBarHeight)
})
type Props = {};

class HomeScreen extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: (tab)=>renderIcon(tab,'HOME'),
    header: null
    // title：标题，会同时设置导航条和标签栏的title
    //tabBarVisible:false

  };
  constructor(){
    super()
    this.state = {
      refreshing:true
    }
  }
  componentDidMount(){

    this.props.getAccountBalance()
    this.props.getRecentlyAccounts()
    this.props.getCargoNameList()
    this.props.getClientNameList()
  }
  componentWillMount(){

  }

  componentWillReceiveProps(nextProps){
    console.warn("receiver")
  }

  /**
   * @desc 跳转到提醒事项的详情页
   * @param params { key： remindId }
   * @private
   */
  _goToRemindDetail = (params:Object) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'RemindDetail',
      params
    });
    this.props.navigation.dispatch(navigateAction)
  }



  _onRefresh = () => {
    this.setState({refreshing: false});
    console.log("refrensh")
  }

  test = () => {
  }

  render() {
    return (
      <View style={styles.container} >
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={false}  //是否隐藏状态栏。
          backgroundColor={'green'} //状态栏的背景色
          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏内部绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
        >
        </StatusBar>
        <TopSafeView style={{backgroundColor:THEME_COLOR}}/>
        <View style={styles.header}>
          <View style={styles.headerButtons}>
            <View style={styles.date}>
              <Text style={[styles.dateTips,{paddingRight:scaleSize(5)}]}>{ "5 / 2018" }</Text>
              <Triangle />
            </View>
            <View style={styles.more}>
              <Search style={{paddingRight:scaleSize(10)}}/>
              <TouchableOpacity onPress={this.test}>
                <Setting />
              </TouchableOpacity>

            </View>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.dateTips}>{"当前总资产（元）"}</Text>
            <Text style={styles.balance}>{"¥" + this.props.balance}</Text>
            <View style={styles.bottomTips}>
              <View style={{paddingTop:scaleSize(10)}}>
                <Text style={styles.dateTips}>{"本月支出（元）¥ 888.00"}</Text>
              </View >
              <View style ={{paddingTop:scaleSize(10)}}>
                <Text style={styles.dateTips}>{"本月收入（元）¥ 28222222222222222.00"}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={[styles.remind]}>
            <View style={styles.contentHeader}>
              <View style={styles.contentHeaderTips}>
                <Text>{"近期提醒"}</Text>
                <Text style={[styles.tips,{marginLeft:scaleSize(5)}]}>{this.props.recentlyReminds.length + '条'}</Text>
              </View>

              <SmallMore style={styles.contentHeaderMore}></SmallMore>
            </View>
            <View style={styles.remindItemWrapper}>
              <FlatList

                data={[{summary: '撒打算打算的',remindId:1,date:'2018/3/4',detail:'撒数据恢复看见啊事故发生过复活节啊沙发上几个发射管发射管法快速减肥噶开始发噶所发生的啊沙发哈沙发上打算打算的'}, {remindId:2,summary:'撒发生打算发',date:'2019/3/4',detail:'撒打算阿斯顿哈师傅哈身份卡发撒舒服'}]}
                ItemSeparatorComponent={ItemSeparatorComponent}
                keyExtractor={
                  /*使用item.remindId作为key*/
                  (item) => item.remindId.toString()
                  
                }
                ListEmptyComponent={NoData({message:"no message"})}
                onRefresh={this._onRefresh}
                refreshing={this.state.refreshing}
                renderItem={({item}) => (
                  <TouchableHighlight style={{
                    paddingTop:scaleHeightSize(12),
                    paddingBottom:scaleHeightSize(12),
                    paddingLeft:scaleSize(27),
                    paddingRight:scaleSize(27)}}
                                      activeOpacity ={0.2}
                                      underlayColor ={'#BABABA'}
                                      onPress = {this._goToRemindDetail.bind(null,{key:item.remindId})}
                  >
                    <View>
                      <Text style={{fontSize:scaleSize(11)}}>{item.summary}</Text>
                      <Text style={styles.remindItem} numberOfLines={2}  ellipsizeMode={'tail'} >
                        <Text style={{color:'#4A4A4A',fontSize:scaleSize(11),fontWeight:'300'}}>{item.date +"   "}</Text>
                        <Text style={{color:'#4A4A4A',fontSize:scaleSize(11),fontWeight:'300'}}>{item.detail}</Text>
                      </Text>
                    </View>

                  </TouchableHighlight>


                )
                }
              />
            </View>
          </View>
          <ScrollView style={styles.recentlyAccounts}>
            <View style={styles.contentHeader}>
              <View style={styles.contentHeaderTips}>
                <Text>{"最近三日账单"}</Text>
                <Text style={[styles.tips,{marginLeft:scaleSize(5),}]}>{this.props.recentlyAccounts.length + '笔'}</Text>

              </View>
              <SmallMore style={styles.contentHeaderMore}></SmallMore>
            </View>
            <View style={styles.accountList}>
              <FlatList

                data={this.props.recentlyAccounts}
                keyExtractor={
                  /*使用item.remindId作为key*/
                  (item) => item.accountId.toString()

                }
                ListEmptyComponent={NoData({message:"no message"})}
                onRefresh={this._onRefresh}
                refreshing={this.state.refreshing}
                renderItem={({item}) => (<AccountItem item={item}/>)
                }
              />
            </View>
          </ScrollView>
        </View>
        <Mask />
        {/* Mask浮层只需要在一个view中注册就可以了 */}

      </View>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    balance:state.HOME.balance,
    recentlyReminds:state.HOME.recentlyReminds,
    recentlyAccounts:state.HOME.recentlyAccounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMask: (type) => dispatch({type}),
    getAccountBalance: () => dispatch(HomeActions.getAccountBalance()),
    getRecentlyAccounts: () => dispatch(HomeActions.getRecentlyAccount()),
    getCargoNameList: () => dispatch(GlobalActions.getCargoNameList()),
    getClientNameList: () => dispatch(GlobalActions.getClientNameList())
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F5F5F5',
    // flex:1

  },
  header:{
    width:scaleSize(375),
    // height:scaleHeightSize(150),
    backgroundColor:'#4A90E2',
    paddingTop:IS_IPHONEX ? 0 : scaleSize(25),
    flex:0
  },
  headerButtons:{
    marginLeft:scaleSize(12),
    marginRight:scaleSize(12),
    flex:0,
    flexDirection:'row',
  },
  date:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'

  },
  more:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    alignSelf:'flex-end'
  },
  wrapper:{
    marginTop:IS_IPHONEX ? 0 :scaleSize(10),
    marginLeft:scaleSize(12),
    marginRight:scaleSize(12),
    paddingBottom:scaleHeightSize(15)

  },
  dateTips:{
    fontSize:scaleSize(11),
    color:'white',
    fontWeight:"700",

    height:scaleSize(12)
  },

  balance:{
    color:'white',
    fontSize:scaleSize(36),
    lineHeight:scaleSize(49),
    fontWeight:"700"
  },
  bottomTips:{
    paddingLeft:scaleSize(5),
    color:'red',
    flex:0,
    flexWrap:'wrap',
  },
  content:{
    backgroundColor:'#EDEDED',
    paddingTop:scaleSize(5),
    paddingRight:scaleSize(5),
    paddingLeft:scaleSize(5),
    paddingBottom:scaleSize(100),

  },
  contentHeader:{
    borderLeftWidth:4,
    borderLeftColor:THEME_COLOR,
    marginLeft:scaleSize(10),
    marginTop:scaleSize(5),
    paddingTop:scaleSize(3),
    paddingBottom:scaleSize(3),
    paddingLeft:scaleSize(12),
    paddingRight:scaleSize(15),
    flex:0,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

  },
  contentHeaderTips:{
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  contentHeaderMore:{
    flexDirection:'row',
    alignSelf:'center',
  },
  remind:{
    backgroundColor:"#F5F5F5",
    borderRadius:scaleSize(3),
      shadowOpacity: 0.3,
      shadowOffset: {
          width: 1,
          height: 1

      },
      shadowColor: "#000",
  },
  recentlyAccounts:{
    backgroundColor:"#F5F5F5",
    height:scaleSize(500),
    borderRadius:scaleSize(3),
    shadowOpacity:0.5,
    shadowOffset:{
      width:1,
      height:2
    },
    shadowColor:"#000",
    marginTop:scaleSize(5),
  },
  remindItem:{
    // flexDirection:'row',
    // flexWrap:'wrap',
    paddingTop:scaleHeightSize(8),

  },




});

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)