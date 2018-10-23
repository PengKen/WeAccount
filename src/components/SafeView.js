import {DeviceInfo ,View } from "react-native";
import React from 'react'
const TopSafeView = (props) => (
  DeviceInfo.isIPhoneX_deprecated ? <View  style={[{height:44},props.style]}/> : null
)


const BottomSafeView = (props) => (
  DeviceInfo.isIPhoneX_deprecated ? <View  style={[{height:34},props.style]}/> : null

)

export default TopSafeView

export {
  TopSafeView,
  BottomSafeView
}