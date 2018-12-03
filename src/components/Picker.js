import React ,{Component} from 'react'
import PropTypes from 'prop-types';
import RNPicker from 'react-native-picker';
import {DEVICE_WIDTH, DEVECE_HEIGHT, THEME_COLOR} from '../utils/constant'
import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Platform,
  BackHandler,
  Animated,
  Easing
} from 'react-native'
class Picker extends Component{
  static propTypes = {
    pickerData:PropTypes.array.isRequired,// picker数组
    targetIndex:PropTypes.number.isRequired,//目标picker在表单中的位置
    lastConfirm:PropTypes.object.isRequired,//上一次确认的值，方便cancel回滚{targetIndex,value}
    cancel:PropTypes.string,             //取消按钮
    title:PropTypes.string,              //中间标题
    confirm:PropTypes.string,            //确认按钮
    callBackValue:PropTypes.func.isRequired, // confirm回调方法
    callBackFoucsSelected:PropTypes.func.isRequired, // 当前picked聚焦的值的回调方法
    callBackCancleSelected:PropTypes.func.isRequired, //用户取消picker的回调
    initialChoosen:PropTypes.number,      //初始选中的index
    synchronousRefresh:PropTypes.bool,   //是否同步刷新
  }

  static defaultProps = {
    targetIndex:0,
    cancel:'取消',
    title:'请选择',
    confirm:'确认',
    pickerBg:[255,255,255,1],
    startYear:2010,
    endYear:2030,
    synchronousRefresh:false
  }

  constructor(props){
    super(props)
    this.state={
      xPosition: new Animated.Value(0),
      isShowPicker:false
    }


  }

  /**
   * @desc 将选中的数据返回给父组件
   * @param this.props.targetIndex（picker在对应表单的索引），pickedValue
   * @private
   */
  _confirmValue(pickedValue){
    if(pickedValue[0]==="<null>")
      pickedValue[0] = this.props.pickerData[0]
    console.log(pickedValue)
    this.props.callBackValue(this.props.targetIndex,pickedValue[0],'confirm')
  }

  /**
   * @desc 用户浏览pciker
   * @param this.props.targetIndex（picker在对应表单的索引），selectedValue
   * @private
   */

  _currentFoucsSelected(selectedValue){

   this.props.callBackFoucsSelected(this.props.targetIndex,selectedValue[0])
  }

  /**
   * @desc 用户取消picker
   * @private
   */
  _canclePicker(){
    this.props.callBackCancleSelected(this.props.targetIndex,this.props.lastConfirm.value),
    this._hide()
  }

  /**
   * @desc 隐藏pick
   * @private
   */
  _hide(){
      RNPicker.hide()
      this.setState({isShowPicker:false})
      this._hideAnimal()
    }

  /**
   * @desc 显示pick时启动动画
   */
  _showAnimal(){
    Animated.timing(
      this.state.xPosition,
      {
        toValue: 1,
        easing: Easing.linear,
        duration: 300,
      }
    ).start()
  }


  /**
   * @desc 隐藏pick时启动动画
   */
  _hideAnimal(){
    Animated.timing(
      this.state.xPosition,
      {
        toValue: 0,
        easing: Easing.linear,
        duration: 200,
      }
    ).start()

  }

  /**
   * @desc 展示picker
   */
  showPicker(){
    if(this.state.isShowPicker)
      return
    else
      this.setState({isShowPicker:true})
      RNPicker.init({
        pickerData: this.props.pickerData,
        selectedValue: [this.props.initialChoosen],
        onPickerConfirm: pickedValue => {
          this._confirmValue(pickedValue)
          this._hide()
        },
        onPickerCancel: data => {
         this._canclePicker()
        },
        onPickerSelect: selectedValue => {
          this._currentFoucsSelected.call(this,selectedValue)
        },
        pickerBg:this.props.pickerBg,
        pickerCancelBtnText:"取消",
        pickerConfirmBtnText:"确定",
        pickerTitleText:this.props.titleText,
        pickerConfirmBtnColor:[74,144,226,1],
        pickerCancelBtnColor:[0,0,59,0.6]

      });
      RNPicker.show();
  }

  render(){
    return (
       <View>
         <Text>12321412</Text>
       </View>
      {/*<Animated.View*/}
        {/*style={[styles.contain,{transform: [{*/}
            {/*translateY: this.state.xPosition.interpolate({*/}
              {/*inputRange: [0, 1],*/}
              {/*outputRange: [DEVECE_HEIGHT  , 0]*/}
            {/*}),*/}
          {/*}]*/}
        {/*} ]}>*/}
      {/*</Animated.View>*/}
    )
  }


  }





const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',

  },
  select: {
    width: DEVICE_WIDTH,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }

})
export default Picker