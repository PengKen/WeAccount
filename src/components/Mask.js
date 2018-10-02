import {AppRegistry, StyleSheet, Text, Modal, PixelRatio, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {Sell,Buy,Contact } from '../icons/addMenu'
import {scaleSize} from "../utils/px2pt";
import {connect} from "react-redux";

class Mask extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可

    this.state = {
      animationType: 'none',//none slide fade
      modalVisible: props.isShowMask,//模态场景是否可见
      transparent: true,//是否透明显示
    };
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
               visible={this.props.isShowMask}
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
            <TouchableOpacity onPress = {() => console.log("SELL")} style={styles.sell}>
              <Sell />
            </TouchableOpacity>

            <Buy  style={styles.buy}/>
            <Contact style={styles.contact}/>
          </View>
        </Modal>

      </View>
    );
  }


}
const mapStateToProps = state =>{
  return {
    isShowMask:state.mask.isShowMask
  }
}
const styles = StyleSheet.create({
  menu:{
    width:375,
    height:667,
    // zIndex:998,
    // bottom:scaleSize(68),
    // backgroundColor:'red'
  },
  sell:{
    position:'absolute',
    left:scaleSize(62),
    bottom:scaleSize(73)

  },
  buy:{
    position:'absolute',
    left:scaleSize(157), // 375 / 2 - (60 / 2 )
    bottom:scaleSize(106)
  },
  contact:{
    position:'absolute',
    right:scaleSize(62),
    bottom:scaleSize(73)
  }
});

export default connect(mapStateToProps)(Mask);