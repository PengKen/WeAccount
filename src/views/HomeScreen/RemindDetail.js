/**
 * @desc 最近提醒的详情页
 */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet,TouchableOpacity} from 'react-native'
import {TopSafeView} from "../../components/SafeView";
import {IS_IPHONEX, THEME_COLOR} from "../../utils/constant";
import {renderIcon} from "../config";
import {connect} from 'react-redux'
import {scaleHeightSize, scaleSize} from "../../utils/px2pt";
import Toast from 'react-native-root-toast';
class RemindDeatil extends Component {
    constructor(props) {
        super(props);
        this.state = {text: 'Useless Placeholder'};
    }

    static navigationOptions = ( {navigation} ) => ({

        title: "详情", //会同时设置导航条和标签栏的title
        headerStyle: {
            backgroundColor: THEME_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
         headerRight: (
            <TouchableOpacity
              style={styles.save}
              onPress={navigation.getParam('handleSave')}
            >
                <Text style={{
                    color:navigation.getParam('saveState') ? '#fff' : '#bbbbbb',
                    fontSize:scaleSize(14)}}>
                  {"保存"}
                </Text>
            </TouchableOpacity>
      ),
    });

    componentDidMount(){
        /*
            每一次路由导航到此都会触发这个钩子
        */
      this.props.navigation.setParams({saveState: false})
      this.props.navigation.setParams({handleSave:this._handleSave})
    }


    _handleSave = () =>{
      /*
        summary的长度在15个词以内
    */
      if(this.state.text.length > 10){
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
            this.props.navigation.setParams({saveState:false})
          },
          onHide: () => {
            // calls on toast\`s hide animation start.

          },
          onHidden: () => {

          }
        });
      }


    }
    _handleChangeText = (text) => {


      this.setState({text})

      this.props.navigation.setParams({saveState: true})
    }

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
                        onChangeText={this._handleChangeText}
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

    },
    save:{
      paddingRight:scaleSize(5),

    }

})

export default connect(mapStateToProps, mapDispatchToProps)(RemindDeatil)