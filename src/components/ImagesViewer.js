/**
 * Created by sybil052 on 2017/7/6.
 * 照片大图预览
 */
import React, {Component} from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';
class ImagesViewer extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    isImageViewerShow:PropTypes.bool,  //取消按钮
    closeImageViewer:PropTypes.func, // 关闭预览器的回调方法
    imagesIndex:PropTypes.number,     //初始选中的index
    images:PropTypes.array,   //用来预览的图片集，对象数组，且必须含有url属性
  }

  static defaultProps = {
    isImageViewerShow:false,  //取消按钮
    closeImageViewer:function () {}, // 关闭预览器的回调方法
    imagesIndex:0,     //初始选中的index
    images:[],   //用来预览的图片集，对象数组，且必须含有url属性
  }


  componentWillMount() {
    // 上个界面传来的照片集合
    // const params = this.props.router.getCurrentRoute().params;
    // const images = params.image;
    // const pageNum = params.num;
    // this.setState({
    //   images: images,
    //   imageIndex: pageNum,
    // });
  }

  _closeModal = () => {
    this.props.closeImageViewer()
  }

  render() {
    return (
      <Modal  visible={this.props.isImageViewerShow}
              transparent={true}
              animationType={'fade'}
              onRequestClose={this._closeModal} // 适配安卓的物理返回键：按返回键关闭
         >
        <ImageViewer imageUrls={this.props.images}
                     onClick={this._closeModal}
                     onSaveToCamera={()=> console.log("saveing")}
                     index={this.props.imagesIndex}
                     saveToLocalByLongPress={true}/>
      </Modal>
    );
  }
}
export default ImagesViewer;