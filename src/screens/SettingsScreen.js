import React from "react"
import { View } from "react-native"
import { List, ListItem, Avatar } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { userLogout } from "../actions/user"

import image from "../images/default_profile.png"

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "center", paddingTop: 24 }}>
          <Avatar
            rounded
            large
            source={image}
          />
        </View>

        <List>
          <ListItem
            title="Sign Out"
            onPress={() => this.props.dispatch(userLogout())}
          />
        </List>
      </View>
    )
  }
}

SettingsScreen.propTypes = {
  dispatch: PropTypes.func,
}

export default connect(state => state)(SettingsScreen)