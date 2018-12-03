import {Text ,View ,StyleSheet} from "react-native";

/**
 * @desc 用于展示无数据时的组件
 */

import React from 'react'
import {scaleHeightSize} from "../utils/px2pt";
const NoData = (props) => {
  return (
    <View style={[styles.container,{height:props.height || scaleHeightSize(150)}]}>
      {/*<Text>{props.message}</Text>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})

export default NoData