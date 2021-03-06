import React from "react"
import { ButtonGroup, FormInput, Button, FormLabel, Text } from "react-native-elements"
import { View, TouchableOpacity as TOpacity, ScrollView } from "react-native"
import Datepicker from "react-native-datepicker"
import PropTypes from "prop-types"
import Picker from "react-native-simple-picker"
import KeyboardSpacer from "react-native-keyboard-spacer"

import categoriesData from "../util/categories"

const RecordForm = ({ record, save, onChange }) => {
  const clear = () => {
    this.descriptionRef.clear()
    this.priceRef.clear()
  }
  let categories

  if (record.type === 0) {
    categories = categoriesData.expenses
  } else {
    categories = categoriesData.incomes
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <ButtonGroup
        onPress={(index) => onChange("type", index)}
        buttons={["Expense", "Income"]}
        selectedIndex={record.type}
      />

      <View>
        <FormLabel>Description</FormLabel>
        <FormInput
          placeholder="Description"
          onChangeText={(val) => onChange("title", val)}
          inputStyle={{ fontSize: 16, padding: 4 }}
          textInputRef={(ref) => this.descriptionRef = ref}
          value={record.title}
        />
      </View>

      <View>
        <FormLabel>Price</FormLabel>
        <FormInput
          keyboardType="numeric"
          onChangeText={(val) => onChange("price", val)}
          placeholder="Price"
          inputStyle={{ fontSize: 16, padding: 4 }}
          textInputRef={(ref) => this.priceRef = ref}
          value={record.price.toString()}
        />
      </View>

      <View>
        <FormLabel>Category</FormLabel>
        <TOpacity onPress={() => this.categoryRef.show()} style={{ padding: 20 }}>
          <Text>{record.category || "Select Category"}</Text>
        </TOpacity>
        <Picker
          labels={categories.labels}
          options={categories.values}
          ref={ref => this.categoryRef = ref}
          onSubmit={category => onChange("category", category)}
        />
      </View>

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

      <KeyboardSpacer />
    </ScrollView>
  )
}

RecordForm.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  save: PropTypes.func,
}

export default RecordForm