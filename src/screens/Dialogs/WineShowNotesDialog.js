import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
// import axios from "axios";

// import AlertAsync from "react-native-alert-async";
import {
  Dialog,
  Text,
  TextInput,
  Button,
  HelperText,
  List,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { getNotesById } from "../../util/https";
import { get } from "react-hook-form";

const WineShowNotesDialog = ({
  showNotesDialog,
  selectedWineText,
  selectedWineId,
  hideShowDialog,
}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fecthNotes = async () => {
      const sorted = await getNotesById(selectedWineId);
      setNotes(sorted);
    };
    fecthNotes();
  }, []);

  const Item = ({ title, notes, rating, vintage }) => (
    <List.Accordion title={vintage + " " + title + " / " + rating}>
      <List.Item title={notes} titleNumberOfLines={100} />
    </List.Accordion>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.author}
      notes={item.noteText}
      rating={item.rating}
      vintage={item.vintage}
    />
  );

  return (
    <Dialog visible={showNotesDialog} onDismiss={hideShowDialog}>
      <Dialog.Title style={{ textAlign: "center" }}>Show Notes</Dialog.Title>
      <Dialog.Content>
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          {selectedWineText}
        </Text>
        {notes.length === 0 && (
          <Text
            variant="titleMedium"
            style={{ textAlign: "center", marginBottom: 16 }}
          >
            No notes for this wine
          </Text>
        )}

        <FlatList data={notes} renderItem={renderItem} />
      </Dialog.Content>

      <Dialog.Actions>
        {/* <Button onPress={hideEditDialog}>Cancel</Button> */}
        <IconButton
          icon="close-circle-outline"
          iconColor={MD3Colors.primary50}
          size={20}
          onPress={hideShowDialog}
        />
        {/* <Button onPress={handleSubmit(onSubmit)}>Add</Button> */}
      </Dialog.Actions>
    </Dialog>
  );
};

export default WineShowNotesDialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
