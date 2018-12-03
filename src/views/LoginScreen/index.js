import {GlobalActions, HomeActions} from "../../store/actions/fetchActions";

;import LinearGradient from 'react-native-linear-gradient'
import React from "react";
import {Text, View, StyleSheet,TextInput,Image,TouchableOpacity,TouchableHighlight,Modal} from "react-native";
import {DEVICE_WIDTH, DEVECE_HEIGHT, THEME_COLOR, DEVICE_INFO} from "../../utils/constant";
import { Logo } from "../../icons/common";
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import Loading from '../../components/Loading'
import GlobalAPI from "../../APIs/GlobalAPI";
import connect from "react-redux/es/connect/connect";
class LoginScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            eyeStatus:'closed', // { close, open }
            phone:'',
            password:'',
            passwordSecure:true,
            showLoginButtonMask:true
        }
    }

    /**
     * @desc 改变密码栏的icon
     * @private
     */
    _togglePasswordIcon = () => {
        // if(!this.state.password) return;  // 如果密码未有任何输入，则点击后仍不打开眼睛
        this.state.eyeStatus === 'closed' ?
            this.setState({eyeStatus:'open', passwordSecure:false}) :
            this.setState({eyeStatus:'closed', passwordSecure:true})
    }

    /**
     * @desc 即时处理用户输入的密码
     * @param password
     * @private
     */
    _handlePassword = (password) => {

    }

    _handleLogin = () => {
        this.props.login({phone:this.state.phone,password:this.state.password})
            .then(success => this.props.navigation.navigate('App'))

    }


    render() {
        return (
            <LinearGradient colors={[THEME_COLOR, '#9BC1EB', '#D1E2F4']} style={styles.container}>

                        <Logo />
                        <View style={styles.loginForm}>
                            <View style={styles.loginId}>
                                <Image
                                    // style={{width: scaleSize(20), height: scaleSize(20)}}
                                    source={require('../../icons/loginIcons/user.png')}
                                    style={{marginLeft: scaleSize(3)}}
                                />
                                <TouchableOpacity>
                                    <TextInput
                                        onChangeText={ (phone) =>  this.setState({ phone}) }
                                        placeholder={"请输入手机号"}
                                        keyboardType={"numeric"}
                                        clearButtonMode="while-editing"
                                        maxLength={11}
                                        style={styles.inputItem}
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={styles.loginPassword}>
                                <TouchableOpacity
                                    onPress = { this._togglePasswordIcon }>
                                    <Image
                                        style={{width: scaleSize(20), height: scaleSize(12)}}
                                        source={
                                            this.state.eyeStatus === 'closed'?
                                                require('../../icons/loginIcons/eye_close.png') :
                                                require('../../icons/loginIcons/eye.png')
                                        }
                                    />
                                </TouchableOpacity>

                                <TextInput
                                    placeholder={"请输入密码"}
                                    clearButtonMode={'while-editing'}
                                    style={styles.inputItem}
                                    secureTextEntry={this.state.passwordSecure}
                                    maxLength={12}
                                    onChangeText={ (password) =>  this.setState({ password}) }
                                    />
                            </View>
                            <View>
                                {   /* 登录按钮蒙版 */
                                    this.state.phone==='' || this.state.password=== '' ?
                                        <View style={styles.loginButtonMask}></View> :
                                    null
                                }
                                <TouchableOpacity
                                    onPress = { this._handleLogin }
                                >
                                    <View style={styles.loginButton}>
                                        <Text  style={{color:'white',fontWeight: '700',fontSize:scaleSize(15)}}>登录</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                    </View>
            </LinearGradient>

                    )
                }
        }
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(GlobalActions.login(data))
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
        flex:0,
        flexDirection:'row',
        borderBottomWidth: 1.2,
        width:scaleSize(350),
        justifyContent:'flex-start',
        borderBottomColor:THEME_COLOR,
        // paddingLeft: scaleSize(3),
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
    },
    inputItem: {
        width: scaleSize(300),
        flex: 0,
        color: 'white',
        fontWeight: '700',
        fontSize: scaleSize(15),
        marginLeft: scaleSize(10)
    },
    loginButtonMask:{
        marginTop:scaleHeightSize(30),
        position:'absolute',
        backgroundColor: '#A5B3C3',
        width:scaleSize(300),
        height:scaleHeightSize(40),
        borderRadius:20,
        zIndex:998,
        opacity:0.5
    }
});
export default connect(null,mapDispatchToProps)(LoginScreen)