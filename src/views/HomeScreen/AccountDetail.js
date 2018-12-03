/**
 * @desc 账单的详情页
 */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native'
import Picker from '../../components/Picker'
import {IS_IPHONEX, THEME_COLOR} from "../../utils/constant";
import {GlobalActions} from "../../store/actions/fetchActions";
import {connect} from 'react-redux'
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import Toast from 'react-native-root-toast';
import ImagesViewer from '../../components/ImagesViewer'

const MoreArrow = require('../../icons/moreArrow.png')

class AccountDeatil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targerNode: null,
            text: 'Useless Placeholder',
            cargoName: '',
            lastConfirm:{targetIndex:'',value:''},
            currentItem: props.navigation.getParam('item'),//当前的account
            currentImageIndex: 0,//当前点击的图片预览索引
            isImageViewerShow: false,//是否显示图片预览器
            pickerData:[],
            content: [
                {
                    key: 'cargoName',
                    item: '货物类型',
                    placeholder: '请选择货物名',
                    clearButtonMode: 'while-editing',
                    maxLength: 10,
                    showArrow: true,
                    type: 'Text',
                    activeOpacity: 1,

                },
                {
                    key: 'amount',
                    item: '数量',
                    placeholder: '请输入重量(吨)',
                    clearButtonMode: 'while-editing',
                    maxLength: 10,
                    keyboardType: 'numeric',
                    type: 'TextInput'
                },
                {
                    key: 'clientName',
                    item: '货主',
                    placeholder: '请选择或输入客户',
                    showArrow: true,
                    type: 'Text',
                    activeOpacity: 1,

                },
                {
                    key: 'price',
                    item: '单价',
                    placeholder: '请输入单价(元/吨)',
                    keyboardType: 'numeric',
                    type: 'TextInput'
                },
                {
                    key: 'havePay',
                    item: '已付',
                    placeholder: '0,000.00元',
                    type: 'TextInput',
                    keyboardType: 'numeric'

                },
                {
                    key: 'needPay',
                    item: '尚未付',
                    placeholder: '0,000.00元',
                    type: 'Text',
                    activeOpacity: 1
                }


            ],
        };
    }

    static navigationOptions = ({navigation}) => ({

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
                    color: navigation.getParam('saveState') ? '#fff' : '#bbbbbb',
                    fontSize: scaleSize(14)
                }}>
                    {"保存"}
                </Text>
            </TouchableOpacity>
        ),
    });

    componentDidMount() {
        /*
            每一次路由导航到此都会触发这个钩子
        */
        this.props.navigation.setParams({saveState: false})
        this.props.navigation.setParams({handleSave: this._handleSave})
        let content = this.state.content
        content = content.map((item, index, array)=>{
            item.value = this.state.currentItem[item.key]
            return item
        })

        this.setState({
            content:content
        })






    }

    /**
     * @desc 根据不同的key展示对应的picker
     * @param item {clientName,cargoName,date'}
     * @private
     */
    _showPciker = (key, targetIndex) => {

        switch (key) {
            case 'clientName':
                if (this.state.lastConfirm.targetIndex !== targetIndex) {
                    this.setState({
                        targetIndex,
                        pickerData: this.props.clientNameList,
                        lastConfirm: {targetIndex, value: this.props.clientNameList[0]}
                    }, function () {
                        this.refs.Pickers.showPicker()
                    })
                } else {
                    this.setState({
                        targetIndex,
                        pickerData: this.props.clientNameList,
                    }, function () {
                        this.refs.Pickers.showPicker()
                    })
                }


                break;

            case 'cargoName':
                if (this.state.lastConfirm.targetIndex !== targetIndex) {
                    this.setState({
                        targetIndex,
                        pickerData: this.props.cargoNameList,
                        lastConfirm: {targetIndex, value: this.props.cargoNameList[0]}
                    }, function () {
                        this.refs.Picker.showPicker()
                    })
                } else {
                    this.setState({
                        targetIndex,
                        pickerData: this.props.cargoNameList
                    }, function () {
                        this.refs.Picker.showPicker()
                    })
                }


                break;
        }
    }

    /**
     * @desc 详情中的任意条目被修改后都要点击保存后才能被真正保存
     * @private
     */
    _handleSave = () => {
        /*
          summary的长度在15个词以内
      */

        if (this.state.text.length > 10) {
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
                    this.props.navigation.setParams({saveState: false})
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
    _handlecargoNameListPickerValue = (pickedValue) => {
        console.log(pickedValue)
    }

    /**
     * @desc 获取picked每次聚焦的值，该值要即时渲染在screen中
     * @private
     */
    _handlecargoNameListSelectedrValue = (selectedValue) => {
        this.setState({cargoName: selectedValue})
    }

    /**
     * @desc 点击文本展示picker
     * @private
     */
    _showcargoNameListPicker = () => {
        this.refs.cargoNameListPicker.showPicker()

    }

    _handlePickerValue = () => {

    }
    /**
     * @desc 展示图片预览器
     */
    _showImageViewer = (index) => {
        this.setState({
            currentImageIndex: index,
            isImageViewerShow: true
        })
    }

    /**
     * @desc 关闭图片预览器
     */
    _closeImageViewer = () => {
        this.setState({
            isImageViewerShow: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    extraData={this.state}
                    data={this.state.content}
                    renderItem={({item, index}) =>
                        <View style={styles.wrapper} ref='clientName'>
                            <View style={styles.items}>
                                <Text style={[styles.text, {}]}>{item.item}</Text>
                            </View>
                            <View style={styles.content}>
                                <TouchableOpacity
                                    activeOpacity={item.activeOpacity}
                                    style={styles.TextWrapper}
                                    onPress={this._showPciker.bind(this, item.key, index)}>
                                    {

                                        item.type === 'Text' ?
                                            <Text
                                                ref={o => this[item.key] = o}
                                                style={!item.value ? {color: '#D6D6D9'} : null}
                                            >
                                                {item.value ? item.value : item.placeholder}
                                                </Text>
                                            :
                                            <TextInput
                                                value={ item.value ?  item.value.toString() : ''}
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
                                        style={{width: scaleSize(20), height: scaleHeightSize(20)}}
                                        source={MoreArrow}
                                    ></Image>
                                    : null}

                            </View>
                        </View>}
                />

                {/* 账单图片 */}
                <View style={[styles.wrapper,{marginTop:scaleHeightSize(20),marginLeft:scaleSize(10)}]}>

                    <FlatList
                        horizontal={true} //设置水平布局
                        data={this.state.currentItem.images}
                        renderItem={({item, index}) =>
                            <TouchableOpacity
                                onPress={this._showImageViewer.bind(this, index)}
                            >
                                <Image
                                    style={{
                                        width: scaleSize(100),
                                        height: scaleHeightSize(100),
                                        marginRight: scaleSize(10)
                                    }}  //必须指定尺寸否则无法显示
                                    source={{uri: item.uri}}/>
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
                    ref={'Pickers'}
                    pickerData={this.state.pickerData}
                    targetIndex={this.state.targetIndex}
                    callBackValue={this._handlePickerValue}
                    callBackFoucsSelected={this._handlePickerValue}
                    callBackCancleSelected={this._handlePickerValue}
                    lastConfirm={this.state.lastConfirm}

                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recentlyAccounts: state.HOME.recentlyAccounts,
        cargoNameList: state.GLOBAL.cargoNameList,
        clientNameList: state.GLOBAL.clientNameList

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCargoNameList: () => dispatch(GlobalActions.getCargoNameList()),
        getClientNameList: () => dispatch(GlobalActions.getClientNameList())
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: scaleSize(10),
        backgroundColor: '#f5f5f5'
    },
    wrapper: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: scaleSize(10),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#EBEBEB',
        paddingBottom: scaleHeightSize(3)

    },
    item: {
        marginRight: scaleSize(8),
        marginBottom: scaleSize(-5),
        flex: 0,
        justifyContent: "center",
        height: scaleHeightSize(20),
        width: scaleSize(60),

    },
    items: {
        marginRight: scaleSize(15),
        flex: 0,
        justifyContent: "center",
        height: scaleHeightSize(20),
        width: scaleSize(100),
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        textAlignVertical: 'top',
        lineHeight: scaleSize(19),
    },
    text: {
        color: '#4A4A4A',
        textAlign: 'center',
        textAlignVertical: 'top',
    },
    save: {
        paddingRight: scaleSize(5),

    },
    TextWrapper: {
        flex: 1,
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(AccountDeatil)