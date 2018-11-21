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
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from '../../components/ImagePicker'
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
          value:props.clientList[0],
          placeholder:'请选择或输入客户',
          showArrow:true,
          type:'Text',
          activeOpacity:1,

        },
        {
          key:'price',
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
          type:'Text',
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
                  pickerData:this.props.clientList,
                  lastConfirm:{targetIndex,value:this.props.clientList[0]}
              },function () {
                  this.refs.Picker.showPicker()
              })
          }else{
              this.setState({
                  targetIndex,
                  pickerData:this.props.clientList,
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


  _handlePickerValue = (targetIndex,value,type) => {

    let {content = {}} = this.state
    content[targetIndex]['value'] = value
    type==='confirm' ?  this.setState({ content, lastConfirm:{targetIndex,value} }) :this.setState({ content })

  }


  componentDidMount(){
      /**
       * @desc 获取货物名称列表和客户列表，并初始化pciker的初始值
       */
    Promise.resolve(this.props.getCargoList())
        .then(res => {
            let {content = {}} = this.state
            content[0].value = this.props.cargoNameList[0]
            this.setState({
                content,
                lastConfirmValue:content[0].value
            })
          })

    Promise.resolve(this.props.getClientList())
        .then(res => {
            let {content = {}} = this.state
            content[2].value = this.props.clientList[0]
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

        <View style={styles.photos}>
          <FlatList
              horizontal={true}
              keyExtractor={(item,index) => index.toString()}
              data={[1,2,3]}
            renderItem= {({item,index}) => (
              <TouchableOpacity
                  onPress = {(item) => ImagePicker.showImagePicker()}
                  style={styles.photo}>
                <View style={{overflow:'visible' }}>
                    <SmallClose style={{position:'absolute',top:scaleHeightSize(-9),right:scaleSize(-9)}}/>
                    <View style={{position:'absolute',top:scaleSize(15),height:scaleHeightSize(50),width:2,backgroundColor:"#D8D8D8",left:scaleSize(40)}}></View>
                    <View style={{position:'absolute',top:scaleHeightSize(40),height:2,width:scaleSize(50),backgroundColor:"#D8D8D8",left:scaleSize(15)}}></View>

                </View>
            </TouchableOpacity>)}
          />
        </View>

        <View style={styles.confirmWrapper}>

            <TouchableOpacity style={styles.confirm}>
                <Text style={{color:'#fff',fontWeight: 'bold'}}>完成</Text>
            </TouchableOpacity>

        </View>
      {/* ActionSheet */}
      <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Apple', 'Banana', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => { /* do something */ }}
      />
      </ScrollView>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    cargoNameList:state.GLOBAL.cargoNameList,
    clientList:state.GLOBAL.clientList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMask: (type) => dispatch({type}),
    getCargoList: () => dispatch(GlobalActions.getCargoList()),
    getClientList:() => dispatch(GlobalActions.getClientList())
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
  photos:{
    marginTop:scaleHeightSize(5),
    paddingLeft: scaleSize(20),
    flex:1,
    flexDirection:'row',
    overflow: 'visible',
    position:'relative',

  },
  photo:{
    marginRight: scaleSize(10),
    height:scaleSize(80),
    width:scaleSize(80),
    marginTop:10,
    borderWidth:1,
    borderColor:"#D8D8D8",
    borderRadius: 5
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