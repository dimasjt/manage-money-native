import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FormInput, ButtonGroup, Button } from 'react-native-elements'
import Datepicker from "react-native-datepicker"

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

  save = async () => {
    try {
      this.props.dispatch(addRecord(this.state.record))

      this.descriptionRef.clear()
      this.priceRef.clear()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ButtonGroup
          onPress={(index) => this.onChange("type", index)}
          buttons={["Expense", "Income"]}
          selectedIndex={this.state.record.type}
        />

        <FormInput
          placeholder="Description"
          onChangeText={(val) => this.onChange("title", val)}
          inputStyle={{ fontSize: 16, padding: 4 }}
          textInputRef={(ref) => this.descriptionRef = ref}
          autoFocus
        />

        <FormInput
          keyboardType="numeric"
          onChangeText={(val) => this.onChange("price", val)}
          placeholder="Price"
          inputStyle={{ fontSize: 16, padding: 4 }}
          textInputRef={(ref) => this.priceRef = ref}
        />

        <View style={{ padding: 10 }}>
          <Datepicker
            date={this.state.record.date}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            onDateChange={(date) => this.onChange("date", date)}
            showIcon={false}
            style={{ width: "100%" }}
          />
        </View>

        <Button
          title="Save"
          onPress={this.save}
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