/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Modal} from 'react-native';
import {Search,More,Filter} from "../../icons/Account";
import {SmallMore} from "../../icons/common";
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import ImageViewer from 'react-native-image-zoom-viewer';
import Mask from '../../components/Mask'
import AccountItem from '../../components/AccountItem'
import TimeUtil from '../../utils/timeUtil'
import ImagesViewer from '../../components/ImagesViewer'
import {Store} from "../../../App";
import {connect} from 'react-redux'
type Props = {};

class ImagesViewerScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            images: props.images,
            imagesIndex: 1,
        };

    }

    componentWillMount() {
        // 上个界面传来的照片集合
        // const params = this.props.navigation.state.params;
        // const images = params.images;
        // const imagesIndex = params.currentImageIndex;
        // console.log(this.state)
        // this.setState({
        //     images: images,
        //     imagesIndex: imagesIndex,
        // });
    }

    render(){
        return (
           <View>
               <ImagesViewer
                   images={ this.state.images }
                   imagesIndex={ this.state.imagesIndex }
                   isImageViewerShow={ true}
                   closeImageViewer={ this._closeImageViewer }
               />
           </View>
        )
    }
}

const mapStateToProps =  (state) => {
    return {
        images:state.GLOBAL.images
    }
}

export default connect(mapStateToProps)(ImagesViewerScreen)

