import React from "react"
import { View } from "react-native"
import { ButtonGroup } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ActionButton from "react-native-action-button"
import moment from "moment"

import RecordList from "../components/RecordsList"
import MonthReport from "../components/MonthReport"

import { getRecords } from "../actions/record"

class MainScreen extends React.Component {
  static navigationOptions = {
    title: "This Month",
  }

  constructor(props) {
    super(props)

    this.state = {
      filter: {
        type: 0,
        userId: props.user.data.id,
      },
    }
  }

  componentWillMount() {
    this.getRecords()
  }

  getRecords = () => {
    this.props.dispatch(getRecords(this.state.filter))
  }

  filterChange = (index) => {
    this.setState({ filter: { ...this.state.filter, type: index } })
  }

  // only show records which month is now
  filterRecords = (records) => {
    return records.filter(record => {
      return moment(record.date).month() === moment().month()
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 3, margin: 10 }}>
          <MonthReport />
        </View>

        <View style={{ flex: 2, zIndex: 10 }}>
          <ButtonGroup
            buttons={["All", "Expenses", "Incomes"]}
            selectedIndex={this.state.filter.type}
            onPress={this.filterChange}
          />
        </View>

        <View style={{ flex: 10 }}>
          <RecordList
            navigation={this.props.navigation}
            filter={this.state.filter}
            getRecords={this.getRecords}
            filterRecords={this.filterRecords}
          />
        </View>

        <ActionButton
          onPress={() => this.props.navigation.navigate("AddRecord")}
        />
      </View>
    )
  }
}

MainScreen.propTypes = {
  dispatch: PropTypes.func,
  records: PropTypes.object,
  user: PropTypes.object,
  navigation: PropTypes.object,
}

export default connect(state => state)(MainScreen)