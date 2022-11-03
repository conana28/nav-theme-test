import React, { useState, useEffect } from "react";
// import { Alert } from "react-native";
// import AlertAsync from "react-native-alert-async";
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
import { addBottleWine } from "../../util/https";

const WineAddBottleDialog = ({
  showAddBottleDialog,
  hideAddDialog,
  selectedWineId,
  selectedWineText,
  selectedWineCountry,
  selectedWineWineId,
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
      vintage: "2020",
      rack: "",
      shelf: "",
      cost: "",
      qty: "1",
    },
  });

  const onSubmit = async (evt) => {
    // console.log("Errors:", errors);
    // console.log(evt);
    reset();
    // Update Bottle Record
    for (let i = 0; i < evt.qty; i += 1) {
      //   console.log("Adding bottle");
      addBottleWine({
        vintage: evt.vintage,
        rack: evt.rack,
        shelf: evt.shelf,
        cost: evt.cost,
        wineText: selectedWineText,
        country: selectedWineCountry,
        wineId: selectedWineWineId,
        wId: selectedWineId,
      });
    }
    // setSearchQuery("");
    setSearchResults("");
    hideAddDialog();
  };

  return (
    <Dialog visible={showAddBottleDialog} onDismiss={hideAddDialog}>
      <Dialog.Title style={{ textAlign: "center" }}>Add bottle</Dialog.Title>
      <Dialog.Content>
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          {selectedWineText}
        </Text>
        {/* Vintage */}
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
        {/* Rack */}
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Qty"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                mode="outlined"
                keyboardType="number-pad"
                error={errors?.qty}
                style={{ marginBottom: 8 }}
              />
              {errors.qty !== undefined && (
                <HelperText type="error">{errors.qty?.message}</HelperText>
              )}
            </>
          )}
          name="qty"
          rules={{
            pattern: {
              value: /^(0|[1-9]\d*)?$/,
              message: "Invalid qty",
            },
            min: { value: 1, message: "Qty must be > 1" },
          }}
        />
      </Dialog.Content>

      <Dialog.Actions>
        {/* <Button onPress={hideEditDialog}>Cancel</Button> */}
        <IconButton
          icon="close-circle-outline"
          iconColor={MD3Colors.primary50}
          size={20}
          onPress={hideAddDialog}
        />
        <Button onPress={handleSubmit(onSubmit)}>Add</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default WineAddBottleDialog;
