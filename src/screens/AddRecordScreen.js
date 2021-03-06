import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import RecordForm from "../components/RecordForm"
import { addRecord } from "../actions/record"

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Add Record",
  }

  state = {
    record: {
      type: 0,
      price: 0,
      title: "",
      date: new Date(),
    },
  }

  onChange = (key, val) => {
    this.setState({
      record: {
        ...this.state.record,
        [key]: val,
      },
    })
  }

  save = async (clear) => {
    try {
      this.props.dispatch(addRecord(this.state.record))
      clear()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <RecordForm
          record={this.state.record}
          onChange={this.onChange}
          save={this.save}
        />
      </View>
    )
  }
}

SettingsScreen.propTypes = {
  dispatch: PropTypes.func,
}

export default connect(state => state)(SettingsScreen)