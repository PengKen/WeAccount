import {scaleHeightSize, scaleSize} from "../utils/px2pt";
import Time from "../utils/timeUtil";
import formatNumber from '../utils/formatNumber'
import {TouchableHighlight,View,Text,Image,StyleSheet } from 'react-native'
import React,{Component} from 'react'
import {NavigationActions, withNavigation} from "react-navigation";
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux'
import {BUY_COLOR, SELL_COLOR} from "../utils/constant";
class AccountItem extends Component {

  /**
   * @desc 跳转到账单详情页
   * @param params {  item }
   * @private
   */
  _goToAccountDetail = (params:Object) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'AccountDetail',
      params
    });
    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    const {item} = this.props
    const {transactionType} = item //账单条目的交易类型 {'buy','sell}
    return (
      <TouchableHighlight style={{
        paddingTop: scaleHeightSize(12),
        paddingBottom: scaleHeightSize(12),
        paddingLeft: scaleSize(10),
        paddingRight: scaleSize(10)
      }}
                          activeOpacity={0.2}
                          underlayColor={'#BABABA'}
                          onPress={this._goToAccountDetail.bind(null, {item})}
      >
        <View>
          <Text style={[styles.tips]}>
            {
              Time.getTimeWithoutYear(item.date) + "   " +
              Time.getRelativeTime(item.date)

            }

          </Text>
          <View style={styles.accountItem}>
            <Image
              style={styles.image}
              source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            />
            <Text>{item.cargoName}</Text>
            <View style={styles.amount}>
              <View>
                <Text style={{fontSize:scaleSize(15)}}>
                  {/*数量*/}
                  {(transactionType === 'buy'? '+ ' : '- ')  + formatNumber(1000) + "吨"}
                </Text>
              </View>
              <View style={{marginTop:scaleHeightSize(3)}}>
                <Text style={transactionType === 'buy' ? styles.buy : styles.sell}>
                  {/*金额*/}
                  {(transactionType === 'buy'? '- ¥ ' : '+ ¥ ') + formatNumber(item.price) + '元'}
                </Text>
              </View>

            </View>
          </View>
        </View>

      </TouchableHighlight>
    )

  }

}
const styles = StyleSheet.create({
  tips:{
    color:'#4A4A4A',
    fontSize:scaleSize(11),
    fontWeight:'300'
  },
  accountList:{
    marginLeft:scaleSize(-18)
  },
  accountItem:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
  },
  image:{
    marginTop:scaleSize(5),
    borderRadius:scaleSize(5),
    height:scaleHeightSize(53),
    width:scaleSize(53),
    marginRight:scaleSize(10)
  },
  amount:{
    alignItems:'flex-end',
    flex:1,
    height:scaleHeightSize(58),
    justifyContent:'center'
  },
  buy:{
    color:BUY_COLOR,
    fontSize:scaleSize(12),
  },
  sell:{
    color:SELL_COLOR,
    fontSize:scaleSize(12),
  }

})

const mapStateToProps = (state) => {
  return {
    balance:state.HOME.balance,
    recentlyReminds:state.HOME.recentlyReminds,
    recentlyAccounts:state.HOME.recentlyAccounts
  }
}

export default connect(mapStateToProps)(withNavigation(AccountItem))

/*
  withNavigation 是一个高阶组件，将对应的组件进一步封装，使得在不深层传递navigation这个props
  的情况下，也能在props中访问到navigation,从而进行跳转
 */