import { Text } from "react-native";
import React from "react";

const CellarConsumeDialog = ({
  showConsumeDialog,
  hideDialog,
  selectedWineText,
  consumeDate,
  setConsumeDate,
  show,
  setShow,
  selectedDate,
  onChange,
}) => {
  return (
    <Dialog visible={showConsumeDialog} onDismiss={hideDialog}>
      <Dialog.Title>Consume a bottle</Dialog.Title>
      <Dialog.Content>
        <Text variant="titleMedium" style={{ marginBottom: 16 }}>
          {selectedWineText}
        </Text>
        {/* <Paragraph>This is simple dialog</Paragraph> */}
        <TextInput
          // label="ConsumeAA"
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
            // positiveButtonLabel="OKKKK!"
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
