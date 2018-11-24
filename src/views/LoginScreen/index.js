import LinearGradient from 'react-native-linear-gradient';
import React from "react";
import {Text, View, StyleSheet,TextInput,Image} from "react-native";
import {DEVICE_WIDTH, DEVECE_HEIGHT, THEME_COLOR} from "../../utils/constant";
import { Logo } from "../../icons/common";
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";

export default class Login extends React.Component{
    render() {
        return (
            <LinearGradient colors={[THEME_COLOR, '#9BC1EB', '#D1E2F4']} style={styles.container}>

                        <Logo />
                        <View style={styles.loginForm}>
                            <View style={styles.loginId}>

                                <TextInput
                                    placeholder={"请输入手机号"}
                                    keyboardType={"numeric"}
                                    clearButtonMode={true}
                                    maxLength={11}
                                    style={{color:'white',fontWeight: '700',fontSize:scaleSize(15)}}
                                />
                            </View>
                            <View style={styles.loginPassword}>
                                <Image
                                    style={{width: scaleSize(20), height: scaleSize(12)}}
                                    source={require('../../icons/眼睛.png')}
                                />
                                <TextInput
                                    placeholder={"请输入密码"}
                                    clearButtonMode={true}
                                    style={{color:'white',fontWeight: '700',fontSize:scaleSize(15),paddingLeft: scaleSize(10)}}
                                    secureTextEntry={true}
                                    />
                            </View>
                            <View style={styles.loginButton}>
                                <Text  style={{color:'white',fontWeight: '700',fontSize:scaleSize(15)}}>登录</Text>
                            </View>
                        </View>
            </LinearGradient>

                    )
                }
        }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        paddingTop: scaleHeightSize(100)
    },
    loginForm: {
        flex: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: scaleHeightSize(60)
    },
    loginId: {
        borderBottomWidth: 1.2,
        width:scaleSize(350),
        borderBottomColor:THEME_COLOR,
        paddingLeft: scaleSize(30),
        paddingBottom: scaleHeightSize(8),
        marginBottom: scaleHeightSize(20)
    },
    loginPassword:{
        flex:0,
        flexDirection:'row',
        borderBottomWidth: 1.2,
        width:scaleSize(350),
        borderBottomColor:THEME_COLOR,
        paddingLeft:scaleSize(3),
        paddingBottom: scaleHeightSize(8),
    },
    loginButton:{
        marginTop:scaleHeightSize(30),
        width:scaleSize(300),
        height:scaleHeightSize(40),
        flex:0,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:THEME_COLOR
    }
});
