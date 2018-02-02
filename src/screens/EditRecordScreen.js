import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import RecordForm from "../components/RecordForm"
import { updateRecord } from "../actions/record"

const defaultState = {
  type: 0,
  price: 0,
  title: "",
  date: new Date(),
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Edit Record",
  }

  constructor(props) {
    super(props)

    const { params } = props.navigation.state
    this.state = {
      record: {
        ...defaultState,
        ...params.record,
        type: params.record.type === "expense" ? 0 : 1,
        date: new Date(params.record.createdAt),
      },
    }

  }

  onChange = (key, val) => {
    this.setState({
      record: {
        ...this.state.record,
        [key]: val,
      },
    })
  }

  save = async () => {
    try {
      this.props.dispatch(updateRecord(this.state.record))
      this.props.navigation.goBack()
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
  navigation: PropTypes.object,
}

export default connect(state => state)(SettingsScreen)