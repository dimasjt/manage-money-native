import React from "react"
import { TouchableOpacity as Touch } from "react-native"
import { ListItem } from "react-native-elements"
import Swipeable from "react-native-swipeable"
import PropTypes from "prop-types"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"

import { deleteRecord } from "../actions/record"

class Record extends React.Component {
  onDelete = () => {
    this.props.dispatch(deleteRecord(this.props.record, this.props.user.data))
  }

  render() {
    const { record } = this.props

    const rightButtons = [
      <Touch key={0} style={{ backgroundColor: "#DC3023", flex: 1, padding: 12, paddingLeft: 28 }} onPress={this.onDelete}>
        <Ionicons name="ios-trash-outline" size={28} style={{ color: "white" }} />
      </Touch>,
    ]

    return (
      <Swipeable rightButtons={rightButtons}>
        <ListItem
          title={record.title}
          titleStyle={{ fontSize: 16 }}
          subtitle={`Rp.${record.price}`}
          hideChevron
        />
      </Swipeable>
    )
  }
}

Record.propTypes = {
  record: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
}

export default connect(state => state)(Record)