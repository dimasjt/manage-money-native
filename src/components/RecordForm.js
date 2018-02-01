import React from "react"
import { ButtonGroup, FormInput, Button } from "react-native-elements"
import { View } from "react-native"
import Datepicker from "react-native-datepicker"
import PropTypes from "prop-types"

const RecordForm = ({ record, save, onChange }) => {
  const clear = () => {
    this.descriptionRef.clear()
    this.priceRef.clear()
  }

  return (
    <View>
      <ButtonGroup
        onPress={(index) => onChange("type", index)}
        buttons={["Expense", "Income"]}
        selectedIndex={record.type}
      />

      <FormInput
        placeholder="Description"
        onChangeText={(val) => onChange("title", val)}
        inputStyle={{ fontSize: 16, padding: 4 }}
        textInputRef={(ref) => this.descriptionRef = ref}
        value={record.title}
        autoFocus
      />

      <FormInput
        keyboardType="numeric"
        onChangeText={(val) => onChange("price", val)}
        placeholder="Price"
        inputStyle={{ fontSize: 16, padding: 4 }}
        textInputRef={(ref) => this.priceRef = ref}
        value={record.price.toString()}
      />

      <View style={{ padding: 10 }}>
        <Datepicker
          date={record.date}
          confirmBtnText="Done"
          cancelBtnText="Cancel"
          onDateChange={(date) => onChange("date", date)}
          showIcon={false}
          style={{ width: "100%" }}
        />
      </View>

      <Button
        title="Save"
        onPress={() => save(clear)}
        style={{ marginTop: 20 }}
      />
    </View>
  )
}

RecordForm.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  save: PropTypes.func,
}

export default RecordForm