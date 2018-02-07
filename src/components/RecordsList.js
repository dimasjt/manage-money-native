import React from "react"
import { FlatList, View, Text } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import HeaderRecord from "./HeaderRecord"
import Record from "./Record"

import recordsWithDate from "../store/states/recordsWithDate";

class RecordsList extends React.PureComponent {
  renderItem = ({ item }) => {
    if (item.isHeader) {
      return <HeaderRecord header={item} />
    }

    return <Record record={item} navigation={this.props.navigation} />
  }

  render() {
    const { records, getRecords } = this.props

    const emptyRecords = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>There are no records.</Text>
      </View>
    )

    return (
      <FlatList
        data={records.ordered}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
        refreshing={records.loading}
        onRefresh={getRecords}
        ListEmptyComponent={emptyRecords}
      />
    )
  }
}

RecordsList.propTypes = {
  navigation: PropTypes.object.isRequired,
  filter: PropTypes.shape({
    type: PropTypes.number,
    userId: PropTypes.number,
  }).isRequired,
  getRecords: PropTypes.func.isRequired,
  records: PropTypes.shape({
    loading: PropTypes.bool,
    ordered: PropTypes.array,
  }).isRequired,
}

export default connect((state, props) => ({
  ...state,
  records: {
    ...state.records,
    ordered: recordsWithDate(state.records.data, props.filter.type),
  },
}))(RecordsList)