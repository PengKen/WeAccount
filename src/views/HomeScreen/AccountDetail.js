/**
 * @desc 账单的详情页
 */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet,TouchableOpacity,Image,FlatList} from 'react-native'
import Picker from '../../components/Picker'
import {IS_IPHONEX, THEME_COLOR} from "../../utils/constant";
import {GlobalActions} from "../../store/actions/fetchActions";
import {connect} from 'react-redux'
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import Toast from 'react-native-root-toast';
import ImagesViewer from '../../components/ImagesViewer'
class AccountDeatil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targerNode:null,
      text: 'Useless Placeholder',
      cargoName:'',
      currentItem:props.navigation.getParam('item'),//当前的account
      currentImageIndex:0,//当前点击的图片预览索引
      isImageViewerShow:false,//是否显示图片预览器
    };
  }

  static navigationOptions = ( {navigation} ) => ({

    title: "账单详情", //会同时设置导航条和标签栏的title
    headerStyle: {
      backgroundColor: THEME_COLOR,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      /*
         设置标题栏右部按钮
       */
      <TouchableOpacity
        style={styles.save}
        onPress={navigation.getParam('handleSave')}
      >
        <Text style={{
          color:navigation.getParam('saveState') ? '#fff' : '#bbbbbb',
          fontSize:scaleSize(14)}}>
          {"保存"}
        </Text>
      </TouchableOpacity>
    ),
  });

  componentDidMount(){
    /*
        每一次路由导航到此都会触发这个钩子
    */
    this.props.navigation.setParams({saveState: false})
    this.props.navigation.setParams({handleSave:this._handleSave})
    this.props.getCargoList()
    this.setState({
      cargoName:this.state.currentItem.cargoName
    })


  }

  /**
   * @desc 详情中的任意条目被修改后都要点击保存后才能被真正保存
   * @private
   */
  _handleSave = () =>{
    /*
      summary的长度在15个词以内
  */

    if(this.state.text.length > 10){
      let toast = Toast.show('概要长度不得超过15个字', {
        duration: Toast.durations.LONG,
        position: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
          // calls on toast\`s appear animation start
        },
        onShown: () => {
          // calls on toast\`s appear animation end.
          this.props.navigation.setParams({saveState:false})
        },
        onHide: () => {
          // calls on toast\`s hide animation start.

        },
        onHidden: () => {

        }
      });
    }


  }

  /**
   * @desc 详情中的任意条目被修改后保存按钮都要高亮显示
   */
  _handleChangeText = (text) => {
    this.setState({text})
    this.props.navigation.setParams({saveState: true})
  }

  /**
   * @desc 获取picker最终confirm的值
   * @param pickedValue
   */
  _handleCargoListPickerValue = (pickedValue) => {
    console.log(pickedValue)
  }

  /**
   * @desc 获取picked每次聚焦的值，该值要即时渲染在screen中
   * @private
   */
  _handleCargoListSelectedrValue = (selectedValue) => {
      this.setState({cargoName:selectedValue})
  }

  /**
   * @desc 点击文本展示picker
   * @private
   */
  _showCargoListPicker = () => {
    this.refs.cargoListPicker.showPicker()

  }

  /**
   * @desc 当用户取消picker时要将值回滚到最初选中的值
   */
  _handleCargoListCancle = () => {
    this.setState({
      cargoName:this.props.recentlyAccounts[this.state.currentItemIndex].cargoName
    })
  }

  /**
   * @desc 展示图片预览器
   */
  _showImageViewer = (index) => {
    this.setState({
      currentImageIndex:index,
      isImageViewerShow:true
    })
  }

  /**
   * @desc 关闭图片预览器
   */
  _closeImageViewer = () => {
    this.setState({
      isImageViewerShow:false
    })
  }
  render() {
    console.log(this.state.currentItemIndex)
    return (
      <View style={styles.container}>
        {/*<Text>{this.props.navigation.getParam('key')}</Text>*/}
        <View style={styles.wrapper}>
          <View  style={styles.item}>
            <Text style={styles.text}>{"货物类型："}</Text>
          </View>
          <View style={styles.content}>
            <TextInput
              onFocus={this._showCargoListPicker}
              value={this.state.cargoName}
            >
            </TextInput>
          </View>

        </View>
        <View style={styles.wrapper}>
          <View  style={styles.item}>
            <Text style={[styles.text,{ }]}>{"数量(吨)："}</Text>
          </View>
          <View style={styles.content}>
            <TextInput
              onChangeText={(text) => this.setState({text})}
              value={this.state.currentItem.amount.toString()}
              clearButtonMode={'while-editing'}
            />
          </View>


        </View>
        <View style={styles.wrapper}>
          <View  style={styles.item}>
            <Text style={[styles.text,{ }]}>{"时间："}</Text>
          </View>
          <View  style={styles.content}>
            <Text>{}</Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View  style={styles.item}>
            <Text style={[styles.text,{ }]}>{"备注："}</Text>
          </View>
          <View  style={styles.content}>
            <TextInput
              onChangeText={(text) => this.setState({text})}
              value={this.state.currentItem.remark.toString()}
              clearButtonMode={'while-editing'}
              multiLine={true}
            />
          </View>
        </View>

        <View style={styles.wrapper}>

          <FlatList
            horizontal={true} //设置水平布局
            data={this.state.currentItem.images}
            renderItem={({item,index}) =>
              <TouchableOpacity
                onPress={this._showImageViewer.bind(this,index)}
              >
                <Image
                  style={{width: scaleSize(100),height:scaleHeightSize(100),marginRight:scaleSize(10)}}  //必须指定尺寸否则无法显示
                  source={{uri:item.uri}} />
              </TouchableOpacity>}
              />

        </View>


        <ImagesViewer
          images={this.state.currentItem.images}
          imagesIndex={this.state.currentImageIndex}
          isImageViewerShow={this.state.isImageViewerShow}
          closeImageViewer={this._closeImageViewer}
        />

        <Picker
          ref={'cargoListPicker'}
           initialChoosen={this.props.pickerData.indexOf(this.state.currentItem.cargoName)}
          {...this.props}
          callBackValue={this._handleCargoListPickerValue}
          callBackFoucsSelected={this._handleCargoListSelectedrValue}
          callBackCancleSelected={this._handleCargoListCancle}
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recentlyAccounts: state.HOME.recentlyAccounts,
    pickerData:state.GLOBAL.cargoNameList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoList: () => dispatch(GlobalActions.getCargoList())
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:scaleSize(10),
    backgroundColor: '#f5f5f5'
  },
  wrapper:{
    flex:0,
    flexDirection: 'row',
    alignItems:'stretch',
    marginTop:scaleSize(10),
    borderBottomWidth: scaleSize(1),
    borderBottomColor:'#EBEBEB',
    paddingBottom: scaleHeightSize(3)

  },
  item:{
    marginRight: scaleSize(8),
    marginBottom:scaleSize(-5),
    flex:0,
    justifyContent: "center",
    height:scaleHeightSize(20),
    width:scaleSize(60),

  },
  content:{
    width:scaleSize(300),
    textAlignVertical: 'top',
    lineHeight:scaleSize(19),
  },
  text:{
    color:'#9D9D9D',
    textAlign:'justify'
  },
  save:{
    paddingRight:scaleSize(5),

  }

})

export default connect(mapStateToProps, mapDispatchToProps)(AccountDeatil)