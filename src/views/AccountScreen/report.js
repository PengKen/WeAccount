/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import {Search,More,Filter} from "../../icons/Account";
import {SmallMore} from "../../icons/common";
import {scaleSize} from "../../utils/px2pt";
import {IS_IPHONEX,THEME_COLOR} from '../../utils/constant'
import Echarts from "native-echarts";

type Props = {};
const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    legend: {
        data:['邮件营销','联盟广告']
    },
    tooltip: {
        trigger: 'axis' //点击时提示文字
    },
    color:['#E75058','#4A90E2', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    //调色盘颜色，默认依次从数组中选取
    series: [
        {
            name:'邮件营销',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        },
        {
            name:'联盟广告',
            data: [820, 932, 92, 934, 1220, 120, 1350],
            type: 'line'
        }
    ]
};
export default class AccountScreen extends Component<Props> {
  // static navigationOptions = {
  //   tabBarLabel: '账单',
  //   tabBarIcon: (tab) =>  renderIcon(tab,'ACCOUNT')
  // };

  render() {




    return (
      <View style={styles.container}>
          { /*
            折线图
         */}
          <View style={styles.lineAccount}>
              <View style={styles.lineAccountHeader}>
                  <View style={styles.dateSelect} >
                      <View style={styles.dateSelectIndex}>
                          <View style={styles.dateSelectMonth}>
                              <Text>{"月"}</Text>
                          </View>
                          <View style={styles.dateSelectYear}>
                              <Text>{"年"}</Text>
                          </View>
                      </View>

                      <Text style={{marginLeft:scaleSize(5)}}>{2018}</Text>
                  </View>
                  <TouchableOpacity onPress={()=> this.props.navigation.dispatch({type:'Filter'})}>
                      <View style={styles.filter}>
                          <Text style={{color:'#4A90E2'}}>{"筛选"}</Text>
                          <Filter />

                      </View>
                  </TouchableOpacity>
              </View>
              <View style={styles.chart}>
                  <Echarts option={option} height={scaleSize(300)} />
              </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

    lineAccount: {
        marginTop: scaleSize(8),
        backgroundColor: "#F5F5F5",
        height: scaleSize(320),
        borderRadius: scaleSize(3),
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height: 1

        },
        shadowColor: "#000",
        marginLeft:scaleSize(5),
        marginRight:scaleSize(5),
        paddingLeft:scaleSize(5),
        paddingRight:scaleSize(5),
        paddingBottom:scaleSize(5)
    },
    lineAccountHeader:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:scaleSize(15),
        paddingLeft:scaleSize(15),
        paddingRight:scaleSize(15)
    },
    dateSelect:{
        width:scaleSize(40),
        height:scaleSize(17),
        borderRadius:scaleSize(3),
        marginBottom: 5,
        flex:0,
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#4A90E2',
        alignItems:'center'
    },
    dateSelectIndex:{
        flex:0,
        flexDirection:'row',
    },
    dateSelectMonth:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height:scaleSize(17),
        borderRightWidth:1,
        borderRightColor:THEME_COLOR
    },
    dateSelectYear:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height:scaleSize(17)
    },
    filter:{
        flex:0,
        flexDirection:'row',

    },
});
