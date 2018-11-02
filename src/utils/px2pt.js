  import {
    PixelRatio
  } from 'react-native';

  PIXEL_RATIO_160_1 = 1; // mdpi for android

  PIXEL_RATIO_240_1d5 = 1.5; // hdp from android


  PIXEL_RATIO_320_2 = 2;  // iphone4, 4s, 5, 5c, 5s, 6, 7;xhdpi from android

  PIXEL_RATIO_480_3 = 3; // iphone6p, 7p; xxhdpi for android,1080p

  PIXEL_RATIO_560_3x5 = 3.5;  // larger from android
  // 设置基准分辨率
  BASE_PIXEL_RATIO = PIXEL_RATIO_320_2;

  var ReactNative = require('react-native');
  var Dimensions = require('Dimensions');
  export var screenW = Dimensions.get('window').width;
  export var screenH = Dimensions.get('window').height;
  var fontScale = ReactNative.PixelRatio.getFontScale();
  export var pixelRatio = ReactNative.PixelRatio.get();

  const w2 = 375  ;
  const h2 = 667 ;
  /**
   * 设置text为sp
   * @param size  sp
   * @returns {Number} dp
   */

  export function setSpText(size:Number) {
    var scaleWidth = screenW / w2 / 2;
    var scaleHeight = screenH / h2 / 2;
    var scale = Math.min(scaleWidth, scaleHeight);

    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    //fontScale只对安卓有效，在ios中等同于pixelRatio
    console.log(fontScale,pixelRatio)
    return size / defaultStatus;
  }
  /**
   * 屏幕宽度适配,缩放size
   * @param size
   * @returns {Number}
   * @constructor
   */
  export function scaleSize(size:Number) {
    var scaleWidth = screenW / w2 ;
    var scale = scaleWidth;
    size = Math.round((size * scale  + 0.5));
    return size
  }

  /**
   * 屏幕高度适配,缩放size
   * @param size
   * @return {number}
   */
  export function scaleHeightSize(size:Number){
    var scaleHeight = screenH / h2 ;
    var scale = scaleHeight;
    size = Math.round((size * scale  + 0.5));
      return size
  }

