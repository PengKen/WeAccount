import {StyleSheet,View,Text} from "react-native";
import {connect} from "react-redux";
import renderIcon from "../../icons/renderIcon";
import React,{Component} from 'react'
import Mask from '../../components/Mask'
import {Store} from "../../../App";
import maskAction from "../../store/actions/maskAction";
const tapTab  = (obj,props) => {
  console.log("tab")
  const isShowMask = Store.getState().MASK.isShowMask //当前mask的状态
  Store.dispatch(maskAction(isShowMask))//现实浮层
}
class MenuScreen extends Component<Props> {

  static navigationOptions = ({navigation}) => {
    return {
      showLable:false,
      tabBarIcon: (tab) =>  renderIcon(tab,'ADD'),
      tabBarOnPress:(obj)=> tapTab(obj,navigation.getParam('isShowMask'))
    }

  };
  render(){
    return (
      <View>
        <Text onPress = { () => this.props.navigation.navigate('FOUND')}>goToFound</Text>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    isShowMask:state.MASK.isShowMask
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMask: (type) => dispatch({type})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    position:'relative',
    backgroundColor:'#EDEDED',
    zIndex:1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);