import {AppRegistry, StyleSheet, Text, Modal, PixelRatio, View} from 'react-native';
import React, {Component} from 'react';
import {Sell,Buy,Contact } from '../icons/addMenu'
import {scaleSize} from "../utils/px2pt";
export default class Mask extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    console.log(props)
    this.state = {
      animationType: 'fade',//none slide fade
      modalVisible: props.visible,//模态场景是否可见
      transparent: true,//是否透明显示
    };
  }
  componentWillReceiveProps(nexProps){
    this.setState({
      modalVisible:nexProps.visible
    })
  }
  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
  startShow = () => {

  }
  render() {
    return (
      <View>
        <Modal animationType={this.state.animationType}
               transparent={this.state.transparent}
               visible={false}
               hardwareAccelerated={true}
               onDismiss={()=>{}}
               onRequestClose={
                 /**
                  * 安卓平台专用
                  * 物理返回键触发时调用
                  */
                 () => this._setModalVisible(false)
               }>
          <View style={styles.menu}>

            <Sell style={styles.sell}/>
            <Buy  style={styles.buy}/>
            <Contact  style={styles.contact}/>
          </View>
        </Modal>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  menu:{
    width:375,
    height:667,
    zIndex:998,
    bottom:scaleSize(68),
  },
  sell:{
    position:'absolute',
    left:scaleSize(62),
    bottom:scaleSize(5)

  },
  buy:{
    position:'absolute',
    left:scaleSize(157), // 375 / 2 - (60 / 2 )
    bottom:scaleSize(38)
  },
  contact:{
    position:'absolute',
    right:scaleSize(62),
    bottom:scaleSize(5)
  }
});

