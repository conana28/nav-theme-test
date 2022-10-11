import {
  Text,
  TextInput,
  Searchbar,
  List,
  Menu,
  Divider,
  Button,
  Paragraph,
  Dialog,
  Portal,
  MD3Colors,
} from "react-native-paper";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import { testBottles } from "../util/https";

function CellarScreen() {
  const [text, setText] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(""); // id of bottle selected
  const [selectedWineText, setSelectedWineText] = React.useState(""); // id of bottle selected

  const onChangeSearch = (query) => setSearchQuery(query);

  const searchCellar = async () => {
    console.log("searchCellar");
    const b = await testBottles();
    // console.log(b.data.bottles1x);
    setSearchResults(b.data.bottles1x);
  };

  const itemPressed = (event, id, wText) => {
    // console.log(Object.keys(event));
    // console.log("Item Pressed", id);
    // console.log("Item Pressed", Math.ceil(event.nativeEvent.pageY));
    setSelectedId(id);
    setSelectedWineText(wText);
    setMenuLocation({ x: 460, y: Math.ceil(event.nativeEvent.pageY) });
    openMenu();
  };

  // Action Menu
  const [visible, setVisible] = React.useState(false);
  const [menuLocation, setMenuLocation] = React.useState({ x: 100, y: 100 });
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const consumePressed = () => {
    console.log("Consume", selectedId);
    closeMenu();
    setShowConsumeDialog(true); // Go to consume dialog
  };
  // Consume Dialog
  const [date, setDate] = React.useState(new Date()); // Date Format
  const [consumeDate, setConsumeDate] = React.useState(
    // Date in string formar for text input
    format(new Date(), "dd/MM/yy")
  );
  const [showConsumeDialog, setShowConsumeDialog] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const hideDialog = () => setShowConsumeDialog(false);
  const onChange = (event, selectedDate) => {
    console.log("E: ", event.type);
    setShow(false);

    if (event.type === "dismissed") {
      return;
    }
    if (event.type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      setConsumeDate(format(currentDate, "dd/MM/yy"));
      return;
    }
    console.log("Should never ever get here");
  };
  return (
    <>
      <View style={style.container}>
        <Text variant="titleLarge">Cellar Screen</Text>
        <TextInput
          label="Search"
          value={text}
          onChangeText={(text) => setText(text)}
        />

        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={() => {
            setSearchLoading(true);
            searchCellar();
            setSearchLoading(false);
          }}
          loading={searchLoading}
        />

        {searchResults.length > 0 && (
          <>
            <List.Section>
              {/* <List.Subheader>Search Results</List.Subheader> */}
              {searchResults.map((bb) => (
                <List.Item
                  key={bb._id}
                  title={bb.wineText + " - " + bb.vintage}
                  titleNumberOfLines={2}
                  titleStyle={{ fontSize: 20 }}
                  onPress={(e) => itemPressed(e, bb._id, bb.wineText)}
                  color={MD3Colors.tertiary70}
                  //   left={() => (
                  //     <List.Icon
                  //       color={MD3Colors.tertiary70}
                  //       style={{ marginLeft: -20, marginRight: -10 }}
                  //       icon="dots-vertical"
                  //     />
                  //   )}
                />
              ))}
            </List.Section>

            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={{ x: menuLocation.x, y: menuLocation.y }}
            >
              <Menu.Item
                onPress={() => {
                  consumePressed();
                }}
                title="Consume"
              />
              <Menu.Item
                onPress={() => {
                  console.log("Move Pressed");
                }}
                title="Move"
              />
              <Divider />
              <Menu.Item onPress={() => {}} title="Edit" />
            </Menu>
            {/* </View> */}
            <Portal>
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
                      <TextInput.Icon
                        icon="calendar"
                        onPress={() => setShow("true")}
                      />
                    }
                  />
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
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
                  <Button onPress={hideDialog}>Update</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        )}
      </View>
    </>
  );
}

export default CellarScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-start",
    marginTop: 16,
    padding: 16,
  },
});
