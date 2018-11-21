
/*
    IS_IPHONEX 是否为IPhone X
    THEME_COLOR App主题颜色
    API_URL API接口地址
    DEVICE_HEIGHT 设备高度
    DEVICE_WIDTH 设备宽度
    BUY_COLOR 买入货物（账户支出的颜色）
    SELL_COLOR 卖出货物（账户收入的颜色）
 */

import {DeviceInfo,Dimensions } from "react-native";
const IS_IPHONEX = DeviceInfo.isIPhoneX_deprecated
const THEME_COLOR = "#4A90E2"
const BUY_COLOR = '#E75058';
const SELL_COLOR = THEME_COLOR
const API_URL = 'http://localhost:3000/api/'
const DEVECE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width
export {
    IS_IPHONEX,
    THEME_COLOR,
    API_URL,
    DEVECE_HEIGHT,
    DEVICE_WIDTH,
    BUY_COLOR,
    SELL_COLOR
}