import React from "react"
import { TabNavigator, StackNavigator } from "react-navigation"
import { Feather, Entypo } from "@expo/vector-icons"

import MainScreen from "./screens/MainScreen";
import AddRecordScreen from "./screens/AddRecordScreen"
import EditRecordScreen from "./screens/EditRecordScreen"
import SettingsScreen from "./screens/SettingsScreen"
import RecordsScreen from "./screens/RecordsScreen"

const Routes = TabNavigator({
  Main: {
    screen: StackNavigator({
      Main: {
        screen: MainScreen,
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
      tabBarIcon: (
        <Entypo name="wallet" size={32} />
      ),
    },
  },
  Records: {
    screen: RecordsScreen,
    navigationOptions: {
      tabBarIcon: (
        <Entypo name="list" size={32} />
      ),
    },
  },
  Settings: {
    screen: StackNavigator({
      Settings: {
        screen: SettingsScreen,
      },
    }),
    navigationOptions: {
      tabBarIcon: (
        <Feather name="settings" size={32} />
      ),
      tabBarLabel: null,
    },
  },
})

export default Routes