import React from "react"
import { View } from "react-native"
import { List, ListItem } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { userLogout } from "../actions/user"

class SettingsScreen extends React.Component {
  render() {
    return (
      <View>
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