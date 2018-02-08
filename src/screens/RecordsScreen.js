import React from "react"
import { View, TouchableOpacity as TOpacity } from "react-native"
import { Text } from "react-native-elements"
import { Constants } from "expo"
import Picker from "react-native-simple-picker"
import moment from "moment"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import lodash from "lodash"

import styles from "../styles/records"
import RecordsList from "../components/RecordsList"

import { getRecords } from "../actions/record"

class RecordsScreen extends React.Component {
  state = {
    month: moment().month(),
    filter: {
      type: 0,
    },
  }

  monthChange = (opt) => {
    this.setState({ month: opt }, this.getRecords)
  }

  getRecords = () => {
    const params = {
      userId: this.props.user.id,
      type: 0,
      month: this.state.month,
    }
    // if the records already loaded, don't need to request to API
    // if (!lodash.includes(this.props.records.loadedMonths, this.state.month)) {
    this.props.dispatch(getRecords(params))
    // }
  }

  monthLabel() {
    return moment().set({ month: this.state.month }).format("MMMM")
  }

  // only show records which same month with current month state
  filterRecords = (records) => {
    return records.filter(record => {
      return moment(record.date).month() === this.state.month
    })
  }

  render() {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <View style={styles.header}>
          <TOpacity onPress={() => this.pickerRef.show()}>
            <Text h3>{this.monthLabel()}</Text>
          </TOpacity>

          <Picker
            labels={moment.months()}
            options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
            ref={ref => this.pickerRef = ref}
            onSubmit={this.monthChange}
          />
        </View>

        <View style={{ flex: 8 }}>
          <RecordsList
            getRecords={this.getRecords}
            navigation={this.props.navigation}
            filter={this.state.filter}
            filterRecords={this.filterRecords}
          />
        </View>
      </View>
    )
  }
}

RecordsScreen.propTypes = {
  records: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  ...state,
  user: state.user.data,
}))(RecordsScreen)