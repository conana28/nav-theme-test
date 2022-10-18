import React from "react";
import { Text, TextInput, Button, Dialog } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { consumeBottle } from "../../util/https";

const CellarConsumeDialog = ({
  showConsumeDialog,
  hideDialog,
  selectedId,
  selectedWineText,
  setSearchQuery,
  setSearchResults,
}) => {
  const [consumeDate, setConsumeDate] = React.useState(
    format(new Date(), "dd/MM/yy") // Date in string format for text input
  );
  const [show, setShow] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date()); // date selected

  // Process Date select from DatePicker
  const onChange = (event, selectedDate) => {
    console.log("E: ", event.type);
    setShow(false);
    if (event.type === "dismissed") {
      return;
    }
    if (event.type === "set") {
      const currentDate = selectedDate;
      setSelectedDate(currentDate);
      setConsumeDate(format(currentDate, "dd/MM/yy"));
      return;
    }
  };

  // Process consume Button
  const consumeDialog = async () => {
    await consumeBottle(selectedId, format(selectedDate, "yyyy-MM-yy"));
    hideDialog();
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Dialog visible={showConsumeDialog} onDismiss={hideDialog}>
      <Dialog.Title style={{ textAlign: "center" }}>
        Consume a bottle
      </Dialog.Title>
      <Dialog.Content>
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          {selectedWineText}
        </Text>

        <TextInput
          // label="ConsumeAA"
          label="Consume"
          mode="outlined"
          value={consumeDate}
          onChangeText={(cDate) => setConsumeDate(cDate)}
          right={
            <TextInput.Icon icon="calendar" onPress={() => setShow("true")} />
          }
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode={"date"}
            is24Hour={true}
            display="default" // Bug in Expo shows buttons as white if not default
            onChange={onChange}
            onError={() => console.log("Error")}
          />
        )}
      </Dialog.Content>
      <Dialog.Actions>
        <Button buttonColor="red" onPress={hideDialog}>
          Cancel
        </Button>
        <Button onPress={consumeDialog}>Consume</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default CellarConsumeDialog;
