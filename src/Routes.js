import { TabNavigator, StackNavigator } from "react-navigation"

import MainScreen from "./screens/MainScreen";
import AddRecordScreen from "./screens/AddRecordScreen"
import SettingsScreen from "./screens/SettingsScreen"

const Routes = TabNavigator({
  Main: {
    screen: StackNavigator({
      Main: {
        screen: MainScreen,
      },
      AddRecord: {
        screen: AddRecordScreen,
      },
    }, {
        mode: "modal",
      }),
  },
  Settings: {
    screen: SettingsScreen,
  },
})

export default Routes