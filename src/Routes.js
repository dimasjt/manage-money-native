import { TabNavigator } from "react-navigation"

import MainScreen from "./screens/MainScreen";
import SettingsScreen from "./screens/SettingsScreen"

const Routes = TabNavigator({
  Main: {
    screen: MainScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
})

export default Routes