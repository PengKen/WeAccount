import {scaleSize} from "../utils/px2pt";
import Svg, {Path, Rect, Circle, G, Text, TSpan, Polygon, Defs, Use, Image} from 'react-native-svg';
import {Platform, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

const Sell = props => {
  return (
    <View style={props.style}>
      <Svg width={scaleSize(60)} height={scaleSize(75)} viewBox={"0 0 " + scaleSize(60) + ' ' + scaleSize(75)}>

        <Circle id="Oval-3" fill="#E75058" cx="30" cy="30" r="30"></Circle>
        <Image id="销售" x="5" y="6" width={scaleSize(46)} height={scaleSize(46)}
               href={require('./sale.png')}></Image>

        <Text id="售出商品" font-family="PingFangSC-Medium, PingFang SC" fontSize="10" fontWeight="400"
              letterSpacing="0.638888836" fill="#E75058">
          <TSpan x="9" y="73">售出商品</TSpan>
        </Text>

      </Svg>
    </View>

  )
}

const Buy = props => {
  return (
    <View style={props.style}><Svg width={scaleSize(60)} height={scaleSize(75)} viewBox={"0 0 " + scaleSize(60) + ' ' + scaleSize(75)}>

      <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="首页-展示菜单按钮" transform="translate(-158.000000, -492.000000)">
          <G id="Group-12">
            <G id="Group-9" transform="translate(158.000000, 492.000000)">
              <G id="Group-8">
                <Circle id="Oval-4" fill="#F8E71C" cx="30" cy="30" r="30"></Circle>
                <G id="Group" transform="translate(15.000000, 14.000000)">
                  <Path
                    d="M0,6 C1.44022567,8.03111369 2.80424226,9.19125492 4.09204979,9.48042368 C5.37985731,9.76959244 9.18250738,9.76959244 15.5,9.48042368 C20.4989817,9.99496637 24.1442255,9.99496637 26.4357315,9.48042368 C28.7272374,8.965881 30.2486603,7.80573977 31,6 L31,27 C31,29.7614237 28.7614237,32 26,32 L5,32 C2.23857625,32 3.38176876e-16,29.7614237 0,27 L0,6 Z"
                    id="Rectangle-2" fill="#FFFFFF"></Path>
                  <Path d="M7.36363636,18.6666667 L14.6363636,13.3333333" id="Line-2" stroke="#F8E500" strokeWidth="2"
                        strokeLinecap="square"></Path>
                  <Path d="M15.3636364,18.6666667 L22.6363636,13.3333333" id="Line-2" stroke="#F8E500" strokeWidth="2"
                        strokeLinecap="square"
                        transform="translate(19.000000, 16.000000) scale(-1, 1) translate(-19.000000, -16.000000) "></Path>
                  <Polygon id="Rectangle-4" fill="#F8E500"
                           points="9 17.6789348 14.5 13 20 17.6789348 20 30 9 30"></Polygon>
                  <Path d="M16.5,23.3333333 L16.5,28.6666667" id="Line-3" stroke="#FFFFFF" strokeWidth="3"
                        strokeLinecap="square"></Path>
                  <Path
                    d="M0,0 L31,0 L31,0 C31,4.418278 27.418278,8 23,8 L8,8 C3.581722,8 5.41083001e-16,4.418278 0,9.79717439e-16 Z"
                    id="Rectangle" fill="#FFFFFF"></Path>
                </G>
              </G>
              <Text id="购入商品" fontFamily="PingFangSC-Medium, PingFang SC" fontSize="10" fontWeight="400"
                    letter-spacing="0.638888836" fill="#F8E500">
                <TSpan x="9" y="73">购入商品</TSpan>
              </Text>
            </G>
          </G>
        </G>
      </G>
    </Svg></View>
    )
}

const Contact = props => {
  return (
    <View style={props.style}>
      <Svg width={scaleSize(60)} height={scaleSize(75)} viewBox={"0 0 " + scaleSize(60) + ' ' + scaleSize(75)}>
        <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <G id="首页-展示菜单按钮" transform="translate(-262.000000, -541.000000)">
            <G id="Group-12">
              <G id="Group-10" transform="translate(262.000000, 541.000000)">
                <Text id="导入客户" fontFamily="PingFangSC-Medium, PingFang SC" fontSize="10" fontWeight="400"
                      letterSpacing="0.638888836" fill="#9ED95D">
                  <TSpan x="10" y="73">导入客户</TSpan>
                </Text>
                <Circle id="Oval-5" fill="#9ED95D" cx="30" cy="30" r="30"></Circle>
                <G id="已加好友" transform="translate(10.000000, 14.000000)" fill="#FFFFFF" fillRule="nonzero">
                  <Path
                    d="M14.6685371,8.64800788 C14.6685371,9.70684474 16.5659592,11.7282867 18.0839063,11.3432638 C19.4120687,10.958193 20.7403255,9.51438123 21.309538,9.41810155 L33.1685321,21.2579623 C34.2121119,20.1991254 37.5326359,16.8300075 38.1018956,16.1562415 C40.6634697,13.7498245 40.6634697,10.5731702 37.9122054,7.87801006 C36.584043,6.53043 33.3583168,2.872521 30.6070997,0.94735871 C28.2353576,-0.68906039 26.2429487,-0.0152463986 23.9660517,1.52494094 C20.74042,3.73889435 17.7993709,5.85656808 14.6686316,8.64810373 L14.6685371,8.64800788 Z M22.4480573,29.1511708 C23.017317,29.8250327 23.017317,30.8838696 22.4480573,31.5575877 L19.6967457,34.2528437 C19.1274861,34.9267056 18.0839063,34.9267056 17.4198487,34.2528437 C16.7556967,33.6752615 16.7556967,32.6164246 17.4198487,31.9426106 L20.0762679,29.151075 C20.7403727,28.5734927 21.7839998,28.5734927 22.4480101,29.151075 L22.4480573,29.1511708 Z M19.2223784,25.9746123 C19.8865305,26.5521945 19.8865305,27.6110314 19.2223784,28.2847975 L16.4710668,30.9800534 C15.9018071,31.6539153 14.8582274,31.6539153 14.1941698,30.9800534 C13.5300178,30.4024712 13.5300178,29.3436343 14.1941698,28.6698203 L16.850589,25.9745644 C17.5147411,25.3007024 18.5583208,25.3007024 19.2223312,25.9745644 L19.2223784,25.9746123 Z M15.996794,22.7019179 C16.660946,23.2795001 16.660946,24.338337 15.996794,25.0121509 L13.2454824,27.8036866 C12.6762227,28.3812688 11.6326429,28.3812688 10.9685381,27.8036866 C10.3044333,27.1298247 10.3044333,26.0709878 10.9685381,25.3972697 L13.6249573,22.7020137 C14.2891094,22.0281518 15.3326892,22.0281518 15.9966995,22.7020137 L15.996794,22.7019179 Z M12.7711151,19.4290317 C13.4352671,20.006614 13.4352671,21.0654508 12.7711151,21.7392648 L10.0198035,24.5308005 C9.45054379,25.1083827 8.40696401,25.1083827 7.74290644,24.5308005 C7.0787544,23.8569386 7.0787544,22.7981017 7.74290644,22.1243835 L10.3993257,19.4291276 C11.0634305,18.7553136 12.1070575,18.7553136 12.7710678,19.4291276 L12.7711151,19.4290317 Z M1.00696601,9.22559011 L7.4582766,2.58368196 C9.16600841,0.947262861 11.4429054,-0.30408544 13.4352199,0.369728551 L14.0993247,0.658519668 L19.0326882,3.06493659 C16.660946,4.99009888 14.8583218,6.14521543 12.5814248,8.1666574 C14.5737392,13.5571214 18.1788931,13.6534011 21.2147873,11.3432159 L26.0532584,16.2524253 L32.504569,22.8943334 C33.1687211,23.5681474 33.1687211,24.6270322 32.504569,25.2045186 C31.9353093,25.8783805 30.8917296,25.8783805 30.2276248,25.2045186 L24.2506815,19.1401927 C23.396792,18.2738673 22.5429497,19.2364724 23.3019468,20.0065181 L29.2788901,26.1670758 C29.9430422,26.8409377 29.9430422,27.8997746 29.2788901,28.477261 C28.7096304,29.1511229 27.6660507,29.1511229 27.0019931,28.477261 L21.0250498,22.5092147 C20.0763152,21.5466096 19.5071027,22.7016782 20.1712075,23.3755881 L26.1481508,29.439914 C26.7174105,30.1137759 26.7174105,31.1726128 26.1481508,31.7501471 C25.4839988,32.424009 24.5353113,32.424009 23.8712538,31.8464268 C24.4405134,30.6913102 24.3455739,29.2474026 23.3969337,28.2848454 C22.7327816,27.6109835 21.8789866,27.3222403 21.0251915,27.418472 C21.0251915,26.5521466 20.7406089,25.5895894 20.1713492,25.0120551 C19.5072444,24.3381932 18.6533549,24.04945 17.7996071,24.1457297 C17.8944994,23.2793563 17.5150245,22.3168471 16.9457648,21.7393128 C16.2816127,21.0654988 15.4278177,20.7767076 14.5740226,20.8729873 C14.668915,20.0066619 14.3843324,19.1402885 13.7201803,18.4665704 C12.5817082,17.3114539 10.6842861,17.3114539 9.45092165,18.4665704 L6.79450243,21.1618264 L1.00734388,15.1937801 C-0.60549558,13.557361 -0.0362358976,10.2845708 1.00734388,9.22573389 L1.00696601,9.22559011 Z M23.0172698,32.8091277 C23.4915899,33.4829896 23.4915899,34.4455468 22.9223774,35.0230811 C22.2582726,35.696943 21.309538,35.696943 20.7403255,35.2155446 L23.0172225,32.8091277 L23.0172698,32.8091277 Z"
                    id="Shape"></Path>
                </G>
              </G>
            </G>
          </G>
        </G>
      </Svg>
    </View>

  )
}


export {
  Sell,
  Buy,
  Contact

}