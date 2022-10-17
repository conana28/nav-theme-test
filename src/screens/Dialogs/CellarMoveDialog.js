import React from "react";
// import { Dialog, Paragraph, Button, Text } from "react-native-paper";
import { Dialog, Text, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";

const CellarMoveDialog = ({
  showMoveDialog,
  hideCMDialog,
  selectedWineText,
  selectedLocation,
}) => {
  console.log(selectedLocation);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rack: selectedLocation.rack,
      shelf: selectedLocation.shelf ? selectedLocation.shelf : "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    hideCMDialog();
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <Dialog visible={showMoveDialog} onDismiss={hideCMDialog}>
      <Dialog.Title style={{ textAlign: "center" }}>
        Re-locate bottle
      </Dialog.Title>
      <Dialog.Content>
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          {selectedWineText}
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="rack"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              style={{ marginBottom: 16 }}
            />
          )}
          name="rack"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="shelf"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="shelf"
          //   rules={{ required: true }}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideCMDialog}>Cancel</Button>
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default CellarMoveDialog;

const styles = StyleSheet.create({
  label: {
    color: "red",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
