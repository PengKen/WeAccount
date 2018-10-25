
/*
    IS_IPHONEX 是否为IPhone X
    THEME_COLOR App主题颜色
    API_URL API接口地址
 */


import {DeviceInfo } from "react-native";
const IS_IPHONEX = DeviceInfo.isIPhoneX_deprecated
const THEME_COLOR = "#4A90E2"
const API_URL = 'http://localhost:3000/api/'
export {
  IS_IPHONEX,
  THEME_COLOR,
  API_URL
}