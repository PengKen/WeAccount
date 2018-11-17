import React ,{Component} from 'react'
import {connect} from 'react-redux'
import Picker from '../../components/Picker'
import PropTypes from "prop-types";
class CargoListPicker extends  Component{
  static propTypes = {
    cancel:PropTypes.string,             //取消按钮
    title:PropTypes.string,              //中间标题
    confirm:PropTypes.string,            //确认按钮
    callBackValue:PropTypes.func, // confirm回调方法
    initialChoosen:PropTypes.array,      //初始选中的index
    synchronousRefresh:PropTypes.bool,   //是否同步刷新
  }

  static defaultProps = {
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
  }

  static showPicker(){
    console.warn("picker")
    // this.refs.CargoListPicker.showPicker()
  }

  render(){
    return (
      <Picker ref={'CargoListPicker'} {...this.props}></Picker>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pickerData:state.GLOBAL.cargoNameList
  }
}

export default connect(mapStateToProps)(CargoListPicker)