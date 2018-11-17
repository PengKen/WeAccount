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
import {Triangle,Back,PhotoAdd} from '../../icons/common'
import {THEME_COLOR} from "../../utils/constant";
import Route from '../../utils/route'
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import DatePicker from 'react-native-datepicker';
import {GlobalActions} from "../../store/actions/fetchActions";
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
      content:[
        {
          key:'cargo',
          item:'货物类型',
          placeholder:'请选择货物名',
          clearButtonMode:'while-editing',
          maxLength:10,
          showArrow:true,
          type:'Text',
          activeOpacity:1
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
          value:null,
          placeholder:'请选择或输入客户',
          showArrow:true,
          type:'Text',
          activeOpacity:1
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
          this.setState({
            targetIndex,
            pickerData:this.props.clientList
          })
          this.refs.Picker.showPicker()
          break;

        case 'cargo':
          this.setState({
            targetIndex,
            pickerData:this.props.cargoNameList
          })
          this.refs.Picker.showPicker()
          break;
    }
  }


  _handlePickerValue = (targetIndex,value) => {

    let {content = {}} = this.state
    content[targetIndex]['value'] = value[0]

    this.setState({
      content
    })

  }
  _handleSelectedrValue = (key,value) => {

  }

  _handlePickerCancle = (key,value) => {

  }


  componentDidMount(){
    this.props.getCargoList() //获取货物名称列表
    this.props.getClientList() //获取客户列表
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
                activeOpacity={1}
                style={styles.TextWrapper}
                onPress={this._showPciker.bind(this,item.key,index)}>
                {

                  item.type === 'Text' ?
                    <Text
                      style={!item.value? {color:'#D6D6D9'}:null}
                    >{item.value ? item.value : item.placeholder}</Text> :
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
          // callBackFoucsSelected={this._handleSelectedrValue}
          // callBackCancleSelected={this._handlePickerCancle}

        />

        <ScrollView style={styles.remark}>
          <TextInput
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
              <TouchableHighlight
                  onPress = {(item) => console.log(index)}
                  style={styles.photo}>
                <View>
                    <View style={{position:'absolute',top:scaleSize(15),height:scaleHeightSize(50),width:2,backgroundColor:"#D8D8D8",left:scaleSize(40)}}></View>
                    <View style={{position:'absolute',top:scaleHeightSize(40),height:2,width:scaleSize(50),backgroundColor:"#D8D8D8",left:scaleSize(15)}}></View>



                </View>
            </TouchableHighlight>)}
          />
        </View>



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
    height:scaleHeightSize(130)
  },
  photos:{
    marginTop:scaleHeightSize(5),
    paddingLeft: scaleSize(20),
    flex:1,
    flexDirection:'row',

  },
  photo:{
    marginRight: scaleSize(10),
      height:scaleHeightSize(80),
      width:scaleSize(80),
      borderWidth:1,
      borderColor:"#D8D8D8"
  }

})
export default connect(mapStateToProps, mapDispatchToProps)(SellScreen);