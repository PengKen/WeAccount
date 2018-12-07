import ImagePickerManager from 'react-native-image-picker';
import {Platform} from 'react-native'
export default class PhotoPicker {
    static options = {
        title: 'Select Avatar', // 选择器的标题，可以设置为空来不显示标题
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo...', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
        chooseFromLibraryButtonTitle: 'Choose from Library...', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
        customButtons: {
            'Choose Photo from Facebook': 'fb', // [按钮文字] : [当选择这个按钮时返回的字符串]
        },
        mediaType: 'photo', // 'photo' or 'video'
        videoQuality: 'high', // 'low', 'medium', or 'high'
        durationLimit: 10, // video recording max time in seconds
        maxWidth: 100, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
        maxHeight: 100, // photos only
        allowsEditing: false, // 当用户选择过照片之后是否允许再次编辑图片
    };
    static showImagePicker = () => {
        // ImagePicker.showImagePicker(PhotoPicker.options, (response) => {
        //     console.log('Response = ', response);
        //
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //         const source = { uri: response.uri };
        //         console.log(source)
        //
        //         // You can also display the image using data:
        //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //
        //         // this.setState({
        //         //     avatarSource: source,
        //         // });
        //     }
        // });
        ImagePickerManager.showImagePicker(PhotoPicker.options, (response) => {
            console.log('Response = ', response);

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
                   let  source = {
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
}

