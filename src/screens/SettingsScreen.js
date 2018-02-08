import React from "react"
import { View } from "react-native"
import { List, ListItem, Avatar, Text } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { userLogout } from "../actions/user"

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings",
  }

  render() {
    const { user, dispatch } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "center", paddingTop: 24 }}>
          <Avatar
            rounded
            large
            source={{ uri: user.picture }}
          />
          <Text h4 style={{ marginTop: 20 }}>{user.name}</Text>
        </View>

        <List>
          <ListItem
            title="Sign Out"
            onPress={() => dispatch(userLogout())}
          />
        </List>
      </View>
    )
  }
}

SettingsScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default connect(state => ({
  user: state.user.data,
}))(SettingsScreen)