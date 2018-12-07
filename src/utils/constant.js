
/*
    IS_IPHONEX 是否为IPhone X
    THEME_COLOR App主题颜色
    API_URL API接口地址
    DEVICE_HEIGHT 设备高度
    DEVICE_WIDTH 设备宽度
    BUY_COLOR 买入货物（账户支出的颜色）
    SELL_COLOR 卖出货物（账户收入的颜色）
    DEVICE_INFO 设备信息

 */
import TimeUtil from './timeUtil'
import  UserDeviceInfo from 'react-native-device-info'
import {DeviceInfo,Dimensions } from "react-native";
const IS_IPHONEX = DeviceInfo.isIPhoneX_deprecated
const THEME_COLOR = "#4A90E2"
const BUY_COLOR = '#E75058';
const SELL_COLOR = THEME_COLOR
const API_URL = 'http://172.20.10.10:3000/api/'
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_INFO = {
    PhoneBrand: UserDeviceInfo.getBrand(),//设备品牌
    FirstInstallTime: TimeUtil.millSecToDate(UserDeviceInfo.getFirstInstallTime()), //应用初次安装时间
    UniqueID: UserDeviceInfo.getUniqueID(), //设备唯一标识符,
    SystemVersion: UserDeviceInfo.getSystemVersion()//系统版本
}
UserDeviceInfo.getIPAddress().then(ip => DEVICE_INFO.IPAddress = ip)
console.log(DEVICE_INFO)
export {
    IS_IPHONEX,
    THEME_COLOR,
    API_URL,
    DEVICE_HEIGHT,
    DEVICE_WIDTH,
    BUY_COLOR,
    SELL_COLOR,
    DEVICE_INFO

}
