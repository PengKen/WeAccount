import {StyleSheet,View} from "react-native";
import {connect} from "react-redux";
import renderIcon from "../../icons/renderIcon";
import React,{Component} from 'react'
class MenuScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      showLable:false,
      tabBarIcon: (tab) =>  renderIcon(tab,'ADD'),
      tabBarOnPress:(obj)=> tapTab(obj,navigation.getParam('isShowMask'))
    }

  };

  render() {
    return (
      <View>
      </View>


    );
  }
}

const mapStateToProps = ({state}) => {
  return {
    isShowMask:state.MASK.isShowMask
  }
}

const mapDispatchToProps = ({dispatch}) => {
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