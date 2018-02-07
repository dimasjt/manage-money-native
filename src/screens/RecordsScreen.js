import React from "react"
import { View, TouchableOpacity as TOpacity } from "react-native"
import { Text } from "react-native-elements"
import { Constants } from "expo"
import Picker from "react-native-simple-picker"
import moment from "moment"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import styles from "../styles/records"
import RecordsList from "../components/RecordsList"

class RecordsScreen extends React.Component {
  state = {
    month: 2,
    filter: {
      type: 0,
    },
  }

  monthChange = (opt) => {
    this.setState({ month: opt })
  }

  getRecords = () => {

  }

  render() {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <View style={styles.header}>
          <TOpacity onPress={() => this.pickerRef.show()}>
            <Text h3>October</Text>
          </TOpacity>

          <Picker
            labels={moment.months()}
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            ref={ref => this.pickerRef = ref}
            onSubmit={this.monthChange}
          />
        </View>

        <View style={{ flex: 8 }}>
          <RecordsList
            getRecords={this.getRecords}
            navigation={this.props.navigation}
            filter={this.state.filter}
          />
        </View>
      </View>
    )
  }
}

RecordsScreen.propTypes = {
  records: PropTypes.object,
  navigation: PropTypes.object,
}

export default connect(state => state)(RecordsScreen)