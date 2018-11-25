import {ActivityIndicator ,Modal,View,StyleSheet } from "react-native";
import React from 'react'
import {DEVICE_WIDTH,DEVICE_HEIGHT} from "../utils/constant";
const Loading = (props) => {
  return (
    <Modal
        visible={props.showLoading}
        onRequestClose={() => false} //阻止安卓上的物理返回键关闭modal
        hardwareAccelerated={true}
        transparent={true}
    >
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>

    </Modal>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems :'center',
        width:DEVICE_WIDTH,
        height:DEVICE_HEIGHT,
        backgroundColor:'black',
        opacity:0.5
    }
})
export default  Loading