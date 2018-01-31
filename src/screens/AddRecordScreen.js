import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInput, ButtonGroup, Button } from 'react-native-elements'


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Add Record",
  }

  state = {
    record: {
      type: 0,
      price: 0,
      title: "",
    },
  }

  selectType = (index) => {
    this.setState({
      record: {
        ...this.state,
        type: index,
      },
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ButtonGroup
          onPress={this.selectType}
          buttons={["Expense", "Income"]}
          selectedIndex={this.state.record.type}
        />

        <FormInput
          keyboardType="numeric"
          autoFocus
          inputStyle={{ fontSize: 50, padding: 4 }}
        />

        <Button
          title="Save"
          onPress={() => { }}
          style={{ marginTop: 20 }}
        />
      </View>
    )
  }
}

SettingsScreen.propTypes = {
  dispatch: PropTypes.func,
}

export default connect(state => state)(SettingsScreen)