/**
 * @desc 入货
 */
import {StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  findNodeHandle,
  Image,
  TouchableHighlight
} from "react-native";
import {connect} from "react-redux";
import Picker from '../../components/Picker'
import React,{Component} from 'react'
import {Triangle, Back, PhotoAdd, SmallClose} from '../../icons/common'
import {THEME_COLOR} from "../../utils/constant";
import Route from '../../utils/route'
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import DatePicker from 'react-native-datepicker';
import {GlobalActions} from "../../store/actions/fetchActions";
import ImagePicker from '../../components/ImagePicker'
import formatNumber from "../../utils/formatNumber";
const MoreArrow = require('../../icons/moreArrow.png')
class SellScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      showLable:false,
      /*
        无法从这里跳到另一个stack
       */
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate({routeName:Route.getPrevTap()})}><Back /></TouchableOpacity>),
      title: "入货", //会同时设置导航条和标签栏的title
      gesturesEnabled: false,
      headerStyle: {
        backgroundColor: THEME_COLOR,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }

  };

  constructor(props){
    super(props)
    this.state = {
      pickerData:[],
      targetIndex:0,
      lastConfirm:{targetIndex:'',value:''},
      content:[
        {
          key:'cargo',
          item:'货物类型',
          placeholder:'请选择货物名',
          clearButtonMode:'while-editing',
          maxLength:10,
          showArrow:true,
          type:'Text',
          activeOpacity:1,
          value:props.cargoNameList[0]

        },
        {
          key:'amount',
          item:'数量',
          placeholder:'请输入重量(吨)',
          clearButtonMode:'while-editing',
          maxLength:10,
          keyboardType:'numeric',
          type:'TextInput'
        },
        {
          key:'client',
          item:'货主',
          value:props.clientNameList[0],
          placeholder:'请选择或输入客户',
          showArrow:true,
          type:'Text',
          activeOpacity:1,

        },
        {
          item:'单价',
          placeholder:'请输入单价(元/吨)',
          keyboardType:'numeric',
          type:'TextInput'
        },
        {
          key:'havePay',
          item:'已付',
          placeholder:'0,000.00元',
          type:'TextInput',
          keyboardType:'numeric'

        },
        {
          key:'needPay',
          item:'尚未付',
          placeholder:'0,000.00元',
          type:'TextInput',
          keyboardType:'numeric',
          activeOpacity:1
        }




      ],
    }
  }

  /**
   * @desc 根据不同的key展示对应的picker
   * @param item {client,cargo,date'}
   * @private
   */
  _showPciker = (key,targetIndex) => {

      switch(key){
        case 'client':
          if(this.state.lastConfirm.targetIndex !== targetIndex){
              this.setState({
                  targetIndex,
                  pickerData:this.props.clientNameList,
                  lastConfirm:{targetIndex,value:this.props.clientNameList[0]}
              },function () {
                  this.refs.Picker.showPicker()
              })
          }else{
              this.setState({
                  targetIndex,
                  pickerData:this.props.clientNameList,
              },function () {
                  this.refs.Picker.showPicker()
              })
          }


          break;

        case 'cargo':
          if(this.state.lastConfirm.targetIndex !== targetIndex){
              this.setState({
                  targetIndex,
                  pickerData:this.props.cargoNameList,
                  lastConfirm:{targetIndex,value:this.props.cargoNameList[0]}
              },function () {
                  this.refs.Picker.showPicker()
              })
          }else{
              this.setState({
                  targetIndex,
                  pickerData:this.props.cargoNameList
              },function () {
                  this.refs.Picker.showPicker()
              })
          }


          break;
    }
  }

    /**
     * @desc picker 回调
     * @param targetIndex
     * @param value
     * @param type
     * @private
     */
  _handlePickerValue = (targetIndex,value,type) => {

    let {content = {}} = this.state
    content[targetIndex]['value'] = value
    type==='confirm' ?  this.setState({ content, lastConfirm:{targetIndex,value} }) :this.setState({ content })

  }

    /**
     * @修改表单中的值，并回馈到content中对应的项中
     * @param targetIndex
     * @param value
     * @private
     */
    _handleContentTextInputValue = (targetIndex,value) => {
        let {content = {}} = this.state
        content[targetIndex]['value'] = value
        this.setState({ content })
    }

    /**
     * @desc 将数值格式化
     * @param targetIndex
     * @private
     */
    _formatValue = (targetIndex) =>{
        let {content = {}} = this.state
        if(!content[targetIndex]['value']) return
        content[targetIndex]['value'] = formatNumber(content[targetIndex]['value'])
        this.setState({ content })
    }

    /**
     * @desc 将格式化数值恢复，即去掉逗号
     * @param targetIndex
     * @private
     */
    _recoverValue = (targetIndex) => {
        let {content = {}} = this.state
        if(!content[targetIndex]['value']) return
        let currentValue =  content[targetIndex]['value']
        content[targetIndex]['value'] = currentValue.replace(/,/g,'')
        this.setState({ content })
    }


  componentDidMount(){
      /**
       * @desc 获取货物名称列表和客户列表，并初始化pciker的初始值
       */
    Promise.resolve(this.props.getCargoNameList())
        .then(res => {
            let {content = {}} = this.state
            content[0].value = this.props.cargoNameList[0]
            this.setState({
                content,
                lastConfirmValue:content[0].value
            })
          })

    Promise.resolve(this.props.getClientNameList())
        .then(res => {
            let {content = {}} = this.state
            content[2].value = this.props.clientNameList[0]
            this.setState({
                content,
                lastConfirmValue:content[2].value
            })
        })
  }

  componentWillReceiveProps(nextProps,nextState){
    console.warn("sell received props")
  }


  scrollViewTo(e){
    let target = e.nativeEvent.target;
    let scrollLength = 0;//初始值
    if (target=== findNodeHandle(this.refs.hour)) {

    }
    scrollLength = 220;
    this.refs.scroll.scrollTo({y:scrollLength,x:0});
  }
  render() {
    return (
      <ScrollView style={styles.container} ref='scroll'>
          {/* 表单列表 */}

      <FlatList
          extraData={this.state}
          data={this.state.content}
          renderItem={({item,index}) =>
            <View style={styles.wrapper} ref='client'>
              <View  style={styles.items}>
                <Text style={[styles.text,{ }]}>{item.item}</Text>
              </View>
            <View  style={styles.content} >
              <TouchableOpacity
                activeOpacity={item.activeOpacity}
                style={styles.TextWrapper}
                onPress={this._showPciker.bind(this,item.key,index)}>
                {

                  item.type === 'Text' ?
                    <Text
                      ref={ o => this[item.key] = o}
                      style={!item.value? {color:'#D6D6D9'}:null}
                    >
                        {item.value ? item.value : item.placeholder}</Text>
                      :
                    <TextInput
                      value={item.value}
                      // onFocus={this.scrollViewTo.bind(this)}
                      // onEndEditing={()=>{this.refs.scroll.scrollTo({y:0,x:0,animated:true})}}
                      clearButtonMode={item.clearButtonMode}
                      placeholder={item.placeholder}
                      maxLength={item.maxLength}
                      keyboardType={item.keyboardType}
                      onChangeText={this._handleContentTextInputValue.bind(this,index)}
                      onBlur={this._formatValue.bind(this,index)}
                      onFocus={this._recoverValue.bind(this,index)}
                    />

                }

              </TouchableOpacity>


              {item.showArrow ?
                <Image
                  style={{width:scaleSize(20),height:scaleHeightSize(20)}}
                  source={MoreArrow}
                ></Image>
                 : null}

            </View>
          </View>}
        />
        <Picker
          ref={'Picker'}
          pickerData={this.state.pickerData}
          targetIndex={this.state.targetIndex}
          callBackValue={this._handlePickerValue}
          callBackFoucsSelected={this._handlePickerValue}
          callBackCancleSelected={this._handlePickerValue}
          lastConfirm={this.state.lastConfirm}

        />
        {/*账单备注*/}
        <ScrollView style={styles.remark} onPress = {() => console.log('press')}>

          <TextInput
            style={{height:scaleHeightSize(130)}}
            multiline={true}
            placeholder={"请补充此订单的其他相关信息或备注等等....(不超过200个词)"}

          />
        </ScrollView>

        <ImagePicker  />

        <View style={styles.confirmWrapper}>

            <TouchableOpacity style={styles.confirm}>
                <Text style={{color:'#fff',fontWeight: 'bold'}}>完成</Text>
            </TouchableOpacity>

        </View>
      </ScrollView>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    cargoNameList:state.GLOBAL.cargoNameList,
    clientNameList:state.GLOBAL.clientNameList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMask: (type) => dispatch({type}),
    getCargoNameList: () => dispatch(GlobalActions.getCargoNameList()),
    getClientNameList:() => dispatch(GlobalActions.getClientNameList())
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:scaleSize(10),
    backgroundColor: '#F5F5F5'
  },
  wrapper:{
    flex:0,
    flexDirection: 'row',
    alignItems:'stretch',
    marginTop:scaleSize(10),
    borderBottomWidth: scaleSize(1),
    borderBottomColor:'#EBEBEB',
    paddingBottom: scaleHeightSize(5)

  },
  items:{
    marginRight: scaleSize(15),
    flex:0,
    justifyContent: "center",
    height:scaleHeightSize(20),
    width:scaleSize(100),
  },
  content:{
    flex:1,
    flexDirection:'row',
    textAlignVertical: 'top',
    lineHeight:scaleSize(19),
  },
  text:{
    color:'#4A4A4A',
    textAlign:'center',
    textAlignVertical: 'top',
  },
  TextWrapper:{
    flex:1,
  },
  remark:{
    marginTop: scaleHeightSize(10),
    paddingLeft: scaleSize(20),
    height:scaleHeightSize(130),
  },

  confirmWrapper:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:scaleHeightSize(25),
  },
  confirm:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    width:scaleSize(270),
    height:scaleHeightSize(45),
    backgroundColor:THEME_COLOR,

  },


})
export default connect(mapStateToProps, mapDispatchToProps)(SellScreen);