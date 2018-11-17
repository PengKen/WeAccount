import { createStackNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen'
import RemindDetail from './RemindDetail'
import AccountDetail from './AccountDetail'
import renderIcon from "../../icons/renderIcon";
import AccountList from './AccountList'
import RemindList from './RemindList'
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  RemindDetail: RemindDetail,
  AccountDetail: AccountDetail,
  AccountList: AccountList,
  RemindList: RemindList
});
HomeStack.navigationOptions = ({ navigation }) => {
  /*
  设置了嵌套的导航页的Icon要拿出到navigation中单独配置
 */

  return {
    tabBarIcon: (tab) =>  renderIcon(tab,'HOME'),
    tabBarVisible: navigation.state.index > 0 ? false : true //跳转到详情页要隐藏tabbar

  };
};
export default HomeStack