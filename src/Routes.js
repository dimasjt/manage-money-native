import React from "react"
import { TabNavigator, StackNavigator } from "react-navigation"
import { Feather, Entypo } from "@expo/vector-icons"

import MainScreen from "./screens/MainScreen";
import AddRecordScreen from "./screens/AddRecordScreen"
import EditRecordScreen from "./screens/EditRecordScreen"
import SettingsScreen from "./screens/SettingsScreen"
import RecordsScreen from "./screens/RecordsScreen";

const Routes = TabNavigator({
  Main: {
    screen: StackNavigator({
      Main: {
        screen: MainScreen,
        navigationOptions: {
          tabBarLabel: "Dashboard",
        },
      },
      AddRecord: {
        screen: AddRecordScreen,
      },
      EditRecord: {
        screen: EditRecordScreen,
      },
    }, {
        mode: "modal",
      }),
    navigationOptions: {
      tabBarIcon({ tintColor }) { // eslint-disable-line react/prop-types
        return <Entypo name="wallet" size={32} color={tintColor} />
      },
    },
  },
  Records: {
    screen: RecordsScreen,
    navigationOptions: {
      tabBarIcon({ tintColor }) { // eslint-disable-line react/prop-types
        return <Entypo name="list" size={32} color={tintColor} />
      },
    },
  },
  Settings: {
    screen: StackNavigator({
      Settings: {
        screen: SettingsScreen,
      },
    }),
    navigationOptions: {
      tabBarIcon({ tintColor }) { // eslint-disable-line react/prop-types
        return <Feather name="settings" size={32} color={tintColor} />
      },
      tabBarLabel: null,
    },
  },
})

export default Routes