import React from "react"
import { View } from "react-native"
import { Text } from "react-native-elements"
import PropTypes from "prop-types"

const HeaderRecord = ({ header }) => {
  return (
    <View style={{ backgroundColor: "#ddd", padding: 10 }}>
      <Text h4>{header.label}</Text>
    </View>
  )
}

HeaderRecord.propTypes = {
  header: PropTypes.object,
}

export default HeaderRecord