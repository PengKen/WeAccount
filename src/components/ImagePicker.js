import ImagePickerManager from 'react-native-image-picker';
import {FlatList, Platform, TouchableOpacity, View, StyleSheet, Image} from 'react-native'
import {SmallClose} from "../icons/common";
import {scaleHeightSize, scaleSize} from "../utils/px2pt";
import React, {Component} from "react";
import ImagesViewer from "./ImagesViewer";
import {NavigationActions, withNavigation} from "react-navigation";
import { connect } from 'react-redux';
import {DEVICE_WIDTH} from "../utils/constant";

class PhotoPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentImageIndex:0,
            isImageViewerShow:false,
            options: {
                title: '', // 选择器的标题，可以设置为空来不显示标题
                cancelButtonTitle: 'Cancel',
                takePhotoButtonTitle: 'Take Photo...', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
                chooseFromLibraryButtonTitle: 'Choose from Library...', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
                customButtons: {
                    // 'Choose Photo from Facebook': 'fb', // [按钮文字] : [当选择这个按钮时返回的字符串]
                },
                mediaType: 'photo', // 'photo' or 'video'
                videoQuality: 'high', // 'low', 'medium', or 'high'
                durationLimit: 10, // video recording max time in seconds
                maxWidth: DEVICE_WIDTH, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
                maxHeight: DEVICE_WIDTH, // photos only
                allowsEditing: false, // 当用户选择过照片之后是否允许再次编辑图片
            },
            images:[

            ]

        }
    }

    /**
     * @desc 关闭图片预览器
     */
    _closeImageViewer = () => {
        this.setState({
            isImageViewerShow: false
        })
    }

    /**
     *
     */
    _showImagePicker = () => {
        ImagePickerManager.showImagePicker(this.state.options, (response) => {
            console.log('Response = ', response);
            let {images} = this.state
            images.push({
                uri: 'data:image/jpeg;base64,' + response.data,
                url: 'data:image/jpeg;base64,' + response.data
            })
            this.props.addImage({
                uri: 'data:image/jpeg;base64,' + response.data,
                url: 'data:image/jpeg;base64,' + response.data
            })
            this.setState({
                images
            })
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                // 这是当用户选择customButtons自定义的按钮时，才执行
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:

                if (Platform.OS === 'android') {
                    let source = {uri: response.uri, isStatic: true};
                } else {
                    let source = {
                        uri: response.uri.replace('file://', ''),
                        isStatic: true
                    };
                }

                // this.setState({
                //     avatarSource: source
                // });
            }
        });
    }

    _goImagesViewerScreen  = (currentImageIndex) => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ImagesViewerScreen',
            params:{
                currentImageIndex,
                images:this.state.pickedImages
            }
        });
        this.props.navigation.dispatch(navigateAction)

    }


    render() {
        return (
            <View style={styles.photos}>
                <FlatList
                    extraData={this.state}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.images}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            onPress={ () => this.setState({isImageViewerShow:true})}
                            style={styles.photo}>
                            <View style={{overflow: 'visible'}}>
                                <SmallClose
                                    style={{position: 'absolute', top: scaleHeightSize(-9), right: scaleSize(-9)}}/>
                                <Image
                                    style={{
                                        height: scaleSize(80),
                                        width: scaleSize(80)
                                    }}
                                    source={item}

                                />
                            </View>
                        </TouchableOpacity>)}
                />
                <TouchableOpacity
                    onPress={this._showImagePicker}
                    style={styles.photo}>
                    <View style={{overflow: 'visible'}}>
                        <View style={{
                            position: 'absolute',
                            top: scaleSize(15),
                            height: scaleHeightSize(50),
                            width: 2,
                            backgroundColor: "#D8D8D8",
                            left: scaleSize(40)
                        }}></View>
                        <View style={{
                            position: 'absolute',
                            top: scaleHeightSize(40),
                            height: 2,
                            width: scaleSize(50),
                            backgroundColor: "#D8D8D8",
                            left: scaleSize(15)
                        }}></View>
                    </View>
                </TouchableOpacity>
                <ImagesViewer
                    imagesa={ this.props.images }
                    imagesIndex={ this.state.imagesIndex }
                    isImageViewerShow={ this.state.isImageViewerShow}
                    closeImageViewer={ this._closeImageViewer }
                />
            </View>
        )
    }
}

const mapStateToProps =  (state) => {
    return {
        images:state.IMAGES.images
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addImage: (image) => dispatch({type:'addImage',image})

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PhotoPicker)

const styles = StyleSheet.create({
    photos: {
        marginTop: scaleHeightSize(5),
        paddingLeft: scaleSize(20),
        flex: 1,
        flexDirection: 'row',
        overflow: 'visible',
        position: 'relative',
    },
    photo: {
        marginRight: scaleSize(10),
        height: scaleSize(80),
        width: scaleSize(80),
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 5
    },
})
