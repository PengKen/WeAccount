import {
  AppRegistry, StyleSheet, Text, Modal, Animated, View, TouchableOpacity, TouchableHighlight,
  DeviceInfo
} from 'react-native';
import React, {Component} from 'react';
import {Sell,Buy,Contact } from '../icons/addMenu'
import {scaleSize} from "../utils/px2pt";
import {connect} from "react-redux";
import maskAction from '../store/actions/maskAction'

class Mask extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可

    this.state = {
      animationType: 'none',//none slide fade
      modalVisible: props.isShowMask,//模态场景是否可见
      transparent: true,//是否透明显示
      SellAnim: {
            left:new Animated.Value(scaleSize(153)),
            bottom:new Animated.Value(DeviceInfo.isIPhoneX_deprecated ? scaleSize(-14) : 20 ),
            opacity:new Animated.Value(1)},
      BuyAnim: {
            left:new Animated.Value(scaleSize(153)),
            bottom:new Animated.Value(DeviceInfo.isIPhoneX_deprecated ? scaleSize(-14) : 20),
            opacity:new Animated.Value(0)},
      ContactAnim: {
            right:new Animated.Value(scaleSize(153)),
            bottom:new Animated.Value(DeviceInfo.isIPhoneX_deprecated ? scaleSize(-14) : 20),
            opacity:new Animated.Value(0)}

    };
  }
  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }
  startShow = () => {

  }

  handlerPress = (param) => {
    console.log(param)
  }

  componentWillReceiveProps() {

  }

  componentDidMount() {
  }

  animateMove = ({saleLeft,saleBottom,saleOpacity,buyBottom,contactBottom,contactRight}) => {
    Animated.parallel([
      //sale

      Animated.timing(                  // 随时间变化而执行动画
        this.state.SellAnim.left,            // 动画中的变量值
        {

          toValue: scaleSize(saleLeft),     // 透明度最终变为1，即完全不透明
          duration: 500,              // 让动画持续一段时间
        }),
      Animated.timing(
        this.state.SellAnim.bottom,
        {

          toValue:scaleSize(DeviceInfo.isIPhoneX_deprecated ? saleBottom + 34 : saleBottom ),
          duration:500
        }
      ),
      Animated.timing(
        this.state.SellAnim.opacity,
        {
          delay:saleOpacity === 1 ? 0 :500,
          toValue:saleOpacity,
          duration:0
        }
      ),

      //buy

      Animated.timing(
        this.state.BuyAnim.bottom,
        {
          delay:100,
          toValue:scaleSize(DeviceInfo.isIPhoneX_deprecated ? buyBottom + 34 : buyBottom),
          duration:500
        }
      ),
      Animated.timing(
        this.state.BuyAnim.opacity,
        {
          delay:saleOpacity === 1 ? 200 :500,
          toValue:saleOpacity,
          duration:0
        }
      ),
      Animated.timing(                  // 随时间变化而执行动画
        this.state.ContactAnim.right,            // 动画中的变量值
        {
          delay:200,
          toValue: scaleSize(contactRight),     // 透明度最终变为1，即完全不透明
          duration: 500,              // 让动画持续一段时间
        }),
      Animated.timing(
        this.state.ContactAnim.bottom,
        {
          delay:200,
          toValue:scaleSize(DeviceInfo.isIPhoneX_deprecated ? contactBottom + 34 : contactBottom),
          duration:500
        }
      ),
      Animated.timing(
        this.state.ContactAnim.opacity,
        {
          delay:saleOpacity === 1 ? 400 :650,
          toValue:saleOpacity,
          duration:0
        }
      ),


    ]).start();                        // 开始执行动画
  }

  animatBack = () => {
    this.animateMove({saleLeft:153,saleBottom:-14,saleOpacity:0,buyBottom:-14,contactBottom:-14,contactRight:153})
    setTimeout(
      () => {
        this.props.toggleMask(maskAction(this.props.isShowMask))
      }, 1000
    )


  }

  render() {
    return (
        <Modal animationType = {this.state.animationType}
               transparent = {this.state.transparent}
               visible = {this.props.isShowMask}
               hardwareAccelerated = {true}
               onDismiss = {()=>{}}
               onShow = {()=>{
                 this.animateMove({
                   saleLeft:63,
                   saleBottom:72,
                   saleOpacity:1,
                   buyBottom:106,
                   contactRight:63,
                   contactBottom:72


                 })
               }}
               onRequestClose={
                 /**
                  * 安卓平台专用
                  * 物理返回键触发时调用
                  */
                 () => this._setModalVisible(false)
               }>


          <TouchableOpacity
            activeOpacity={1}
            onPress = { this.animatBack }
            >
            <View style={styles.menu}>
              <Animated.View style={{
                position:'absolute',
                left:this.state.SellAnim.left,
                bottom:this.state.SellAnim.bottom,
                opacity:this.state.SellAnim.opacity

              }}>
                <TouchableOpacity  >
                  <Sell />
                </TouchableOpacity>
              </Animated.View>



                <Animated.View  style={{
                  position:'absolute',
                  left:this.state.BuyAnim.left,
                  bottom:this.state.BuyAnim.bottom,
                  opacity:this.state.BuyAnim.opacity}}>
                  <TouchableOpacity>
                    <Buy />
                  </TouchableOpacity>
                </Animated.View>



              <Animated.View style={{
                position:'absolute',
                right:this.state.ContactAnim.right,
                bottom:this.state.ContactAnim.bottom,
                opacity:this.state.ContactAnim.opacity}}>
                <TouchableOpacity >
                  <Contact />
                </TouchableOpacity>
              </Animated.View>

            </View>
          </TouchableOpacity>

        </Modal>
    );
  }


}

const styles = StyleSheet.create({
  container:{

    height:667,
  },
  menu:{
    width:scaleSize(375),
    //这里的高度适配有问题
    height:812,
    backgroundColor:'rgba(0,0,0,0.5)',
    // zIndex:998,
    // bottom:scaleSize(68),
    // backgroundColor:'red'

  },
  sell:{
    position:'absolute',
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

const mapStateToProps = (state) => {
  return {
    isShowMask:state.mask.isShowMask
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {

  return {

    toggleMask: (action) => dispatch(action)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Mask);