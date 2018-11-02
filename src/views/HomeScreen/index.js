import { createStackNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen'
import RemindDetail from './RemindDetail'
import AccountNav from "../AccountScreen";
import {renderIcon} from "../config";
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  RemindDetail: RemindDetail,
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