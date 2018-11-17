import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native'
import {scaleSize} from "../utils/px2pt";
const ItemSeparatorComponent = (props) => {
  return (
    <View style={styles.separator}></View>
  )
}


const styles = StyleSheet.create({
  separator:{
    height:scaleSize(1),
    backgroundColor:'#E8E8E8',
    marginLeft:scaleSize(17)
  }

})


export default  ItemSeparatorComponent