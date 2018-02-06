import React from "react"
import { TouchableOpacity as TOpacity, TouchableHighlight as THighlight, View } from "react-native"
import { Text, Avatar } from "react-native-elements"
import Swipeable from "react-native-swipeable"
import PropTypes from "prop-types"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"

import money from "../util/money"
import { deleteRecord } from "../actions/record"
import styles from "../styles/record"

class Record extends React.Component {
  onDelete = () => {
    this.props.dispatch(deleteRecord(this.props.record, this.props.user.data))
  }

  onEdit = () => {
    this.props.navigation.navigate("EditRecord", { record: this.props.record })
    this.swipeRef.recenter()
  }

  itemTypeStyle = () => {
    let style = [styles.item]
    if (this.props.record.type === "expense") {
      return style.concat(styles.itemTypeExpense)
    } else {
      return style.concat(styles.itemTypeIncome)
    }
  }

  render() {
    const { record } = this.props

    const rightButtons = [
      <TOpacity key={0} style={{ backgroundColor: "#DC3023", flex: 1, padding: 12, paddingLeft: 28 }} onPress={this.onDelete}>
        <Ionicons name="ios-trash-outline" size={28} style={{ color: "white" }} />
      </TOpacity>,
    ]

    return (
      <Swipeable rightButtons={rightButtons} onRef={ref => this.swipeRef = ref}>
        <THighlight
          onPress={this.onEdit}
          style={styles.touch}
          underlayColor="#eee"
        >
          <View style={this.itemTypeStyle()}>
            <Avatar
              small
              rounded
              icon={{ name: "food", type: "material-community" }}
            />
            <View style={styles.text}>
              <Text style={styles.description}>{record.title}</Text>
              <Text style={styles.price}>{money(record.price)}</Text>
            </View>
          </View>
        </THighlight>
      </Swipeable>
    )
  }
}

Record.propTypes = {
  record: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  navigation: PropTypes.object,
}

export default connect(state => state)(Record)