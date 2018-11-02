/**
 * @desc 最近提醒的详情页
 */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {TopSafeView} from "../../components/SafeView";
import {IS_IPHONEX, THEME_COLOR} from "../../utils/constant";
import {renderIcon} from "../config";
import {connect} from 'react-redux'
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";

class RemindDeatil extends Component {
    constructor(props) {
        super(props);
        this.state = {text: 'Useless Placeholder'};
    }

    static navigationOptions = {

        title: "详情", //会同时设置导航条和标签栏的title
        headerStyle: {
            backgroundColor: THEME_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },

    };


    render() {
        return (
            <View style={styles.container}>
                {/*<Text>{this.props.navigation.getParam('key')}</Text>*/}
                <View style={styles.wrapper}>
                    <View  style={styles.item}>
                        <Text style={styles.text}>{"概要："}</Text>
                    </View>
                    <TextInput
                        style={styles.content}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        clearButtonMode={'while-editing'}

                    />
                </View>
                <View style={styles.wrapper}>
                    <View  style={styles.item}>
                        <Text style={[styles.text,{ }]}>{"内容："}</Text>
                    </View>
                    <View  style={styles.content}>
                        <TextInput

                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            clearButtonMode={'while-editing'}
                            multiline={true}


                        />
                    </View>


                </View>
                <View style={styles.wrapper}>
                    <View  style={styles.item}>
                        <Text style={[styles.text,{ }]}>{"时间："}</Text>
                    </View>
                    <View  style={styles.content}>
                        <Text>{"yyyy-mm--dd"}</Text>
                    </View>


                </View>


            </View>
        )
    }
}

const mapStateToProps = ({state}) => {
    return {
        // recentlyReminds: state.HOME.recentlyReminds
    }
}

const mapDispatchToProps = ({dispatch}) => {
    return {
        // toggleMask: (type) => dispatch({type})
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
        height:scaleHeightSize(20)
    },
    content:{
        width:scaleSize(300),
        textAlignVertical: 'top',
        lineHeight:scaleSize(19),
    },
    text:{
        color:'#9D9D9D',


    }

})

export default connect(mapStateToProps, mapDispatchToProps)(RemindDeatil)