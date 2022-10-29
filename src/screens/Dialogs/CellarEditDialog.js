import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import AlertAsync from "react-native-alert-async";
import {
  Dialog,
  Text,
  TextInput,
  Button,
  HelperText,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { updateBottle, deleteBottle, getBottle } from "../../util/https";

const CellarEditDialog = ({
  showEditDialog,
  hideEditDialog,
  selectedWineText,
  selectedId,
  setSearchQuery,
  setSearchResults,
}) => {
  // Form
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rack: "",
      shelf: "",
      vintage: "",
      cost: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log("Errors:", errors);
    // console.log(data);
    await updateBottle(selectedId, data);
    setSearchQuery("");
    setSearchResults("");
    hideEditDialog();
  };

  // Delete Confirm
  // https://stackoverflow.com/questions/48809762/how-to-await-for-the-response-of-alert-dialog-in-react-native#:~:text=From%20my%20observation%2C%20the%20Alert,execute%20regardless%20the%20callback%20function.

  const showDeleteAlert = async () => {
    const choice = await AlertAsync(
      "Are you sure you want to delete?",
      "This cannot be undone",
      [
        { text: "Yes", onPress: () => "yes" },
        { text: "No", onPress: () => Promise.resolve("no") },
      ],
      {
        cancelable: true,
        onDismiss: () => "no",
      }
    );

    if (choice === "yes") {
      // console.log("Delete ", selectedId);
      const result = await deleteBottle(selectedId);
      console.log(result);
      hideEditDialog();
      // Need to reset searcbar
    } else {
      await console.log("DO NOTHING");
    }

    console.log("POST ALERT");
  };

  useEffect(() => {
    // Lookup Bottle
    const fecthBottle = async () => {
      console.log("Fetch Bottle");
      const btl = await getBottle(selectedId);
      console.log(btl);
      reset({
        rack: btl.bottle.rack,
        shelf: btl.bottle.shelf,
        vintage: btl.bottle.vintage,
        cost: btl.bottle.cost,
      });
    };

    fecthBottle();
  }, []);

  return (
    <Dialog visible={showEditDialog} onDismiss={hideEditDialog}>
      <Dialog.Title style={{ textAlign: "center" }}>Edit bottle</Dialog.Title>
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
            <>
              <TextInput
                label="rack"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                mode="outlined"
                error={errors?.rack}
                style={{ marginBottom: 8 }}
              />
              {errors.rack !== undefined && (
                <HelperText type="error">{errors.rack?.message}aaa</HelperText>
              )}
            </>
          )}
          name="rack"
          rules={{
            required: { value: true, message: "Rack cannot be empty" },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="shelf"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              style={{ marginBottom: 8 }}
            />
          )}
          name="shelf"
          rules={{ required: false }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="vintage"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                mode="outlined"
                keyboardType="number-pad"
                error={errors?.vintage}
                style={{ marginBottom: 8 }}
              />
              {errors.vintage !== undefined && (
                <HelperText type="error">{errors.vintage?.message}</HelperText>
              )}
            </>
          )}
          name="vintage"
          rules={{
            required: { value: true, message: "Vintage is required" },
            pattern: {
              // value: /^(0|[1-9]\d*)(\.\d+)?$/,
              value: /^(0|[1-9]\d*)?$/,
              message: "Invalid Vintage",
            },
            maxLength: { value: 4, message: "Too long" },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="cost"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                mode="outlined"
                keyboardType="number-pad"
                error={errors?.cost}
                style={{ marginBottom: 8 }}
              />
              {errors.cost !== undefined && (
                <HelperText type="error">{errors.cost?.message}</HelperText>
              )}
            </>
          )}
          name="cost"
          rules={{
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Invalid Cost",
            },
            maxLength: { value: 6, message: "Too long" },
          }}
        />
      </Dialog.Content>

      <Dialog.Actions>
        {/* <Button onPress={hideEditDialog}>Cancel</Button> */}
        <IconButton
          icon="close-circle-outline"
          iconColor={MD3Colors.primary50}
          size={20}
          onPress={hideEditDialog}
        />
        <IconButton
          icon="delete"
          iconColor={MD3Colors.error40}
          size={20}
          onPress={showDeleteAlert}
        />
        {/* <Button onPress={showDeleteAlert}>Delete</Button> */}
        <Button onPress={handleSubmit(onSubmit)}>Update</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default CellarEditDialog;
