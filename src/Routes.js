import { StackNavigator } from "react-navigation"

import AuthScreen from "./screens/AuthScreen";

const Routes = StackNavigator({
  Auth: {
    screen: AuthScreen,
  },
})

export default Routes