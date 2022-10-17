import {
  Text,
  TextInput,
  Searchbar,
  Menu,
  Divider,
  Button,
  Dialog,
  Portal,
  useTheme,
  HelperText,
  Card,
  Title,
  Paragraph,
  Surface,
} from "react-native-paper";
import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import { searchBottles, consumeBottle, testBottles } from "../util/https";
import { FlatList } from "react-native";
import CellarMoveDialog from "./Dialogs/CellarMoveDialog";

function CellarScreen() {
  // const [text, setText] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState(""); // Search bar contents
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]); // Search results
  const [selectedId, setSelectedId] = React.useState(""); // id of bottle selected
  const [selectedDate, setSelectedDate] = React.useState(new Date()); // date selected
  const [selectedWineText, setSelectedWineText] = React.useState(""); // text of bottle selected
  const [selectedLocation, setSelectedLocation] = React.useState({
    rack: "RACK",
    shelf: "SHELF",
  }); // text of bottle selected
  // const { colors } = useTheme();

  // Action Menu
  const [visible, setVisible] = React.useState(false);
  const [menuLocation, setMenuLocation] = React.useState({ x: 100, y: 100 });
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  // Menu item pressed
  const itemPressed = (event, id, wText) => {
    setSelectedId(id);
    setSelectedWineText(wText);
    setMenuLocation({ x: 380, y: Math.ceil(event.nativeEvent.pageY) });
    openMenu();
  };

  // Move / Edit
  const [showMoveDialog, setShowMoveDialog] = React.useState(false);
  const hideCMDialog = () => setShowMoveDialog(false);
  const movePressed = () => {
    closeMenu();
    setShowMoveDialog(true); // Go to move dialog
  };

  //Consume
  const consumePressed = () => {
    console.log("Consume", selectedId);
    closeMenu();
    setShowConsumeDialog(true); // Go to consume dialog
  };

  // Consume Dialog
  const [consumeDate, setConsumeDate] = React.useState(
    format(new Date(), "dd/MM/yy") // Date in string format for text input
  );
  const [showConsumeDialog, setShowConsumeDialog] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const hideDialog = () => setShowConsumeDialog(false);

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

  /* Search Bar */
  const [showHelpText, setShowHelpText] = React.useState(true);
  const [showHelpError, setShowHelpError] = React.useState(false);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setShowHelpText(true);
    setShowHelpError(false);
    setSearchResults([]);
    const commaPosition = query.indexOf(",") + 1;
    if (commaPosition > 0) {
      // , entered
      setShowHelpText(false);
      const vintage = query.slice(commaPosition);
      if (vintage.length > 0) {
        setShowHelpError(isNaN(Number(vintage)));
      }
    }
  };
  // Process search string
  const searchCellar = async () => {
    console.log("searchCellar: ", searchQuery);
    if (searchQuery.length === 0) {
      return;
    }
    const comma = searchQuery.indexOf(",");
    let searchWine = "";
    let searchVintage = "";
    if (comma === -1) {
      searchWine = searchQuery;
    } else {
      searchWine = searchQuery.substring(0, comma);
      searchVintage = searchQuery.substring(comma + 1);
    }
    const searchObj = { wineText: searchWine, vintage: searchVintage };
    setSearchLoading((prev) => true);
    const b = await searchBottles(searchObj);
    setSearchResults(b);
    setSearchLoading((prev) => false);
  };

  return (
    <>
      <View style={styles.container}>
        <Searchbar
          placeholder="Wine search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={searchCellar}
          loading={searchLoading}
          style={{ width: "100%" }}
        />

        {showHelpError && (
          <HelperText type="error" visible={showHelpError}>
            invalid vinatge
          </HelperText>
        )}

        {showHelpText && (
          <HelperText type="info" visible={showHelpText}>
            Use , to include vintage
          </HelperText>
        )}

        {/* <Text>Search query = {searchQuery}</Text> */}

        {searchResults.length > 0 && (
          <>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={(e) => {
                    itemPressed(
                      e,
                      item._id,
                      item.vintage +
                        " " +
                        item.wineText +
                        " : " +
                        item.rack +
                        (item.shelf ? "/" + item.shelf : "")
                    );

                    setSelectedLocation({ rack: item.rack, shelf: item.shelf });
                  }}
                >
                  <Card elevation={2} style={styles.card} mode={"elevated"}>
                    <Card.Content>
                      <Title>
                        {item.vintage === undefined
                          ? item.wineText
                          : item.wineText + "," + item.vintage}
                        {" : "}
                        {item.shelf === ""
                          ? item.rack
                          : item.rack + "/" + item.shelf}
                      </Title>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
            />

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
              <Menu.Item onPress={movePressed} title="Move" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Edit" />
            </Menu>
            {/* </View> */}
            <Portal>
              {/* Consume Dialog */}
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

              {showMoveDialog && (
                <CellarMoveDialog
                  showMoveDialog={showMoveDialog}
                  hideCMDialog={hideCMDialog}
                  selectedWineText={selectedWineText}
                  // selectedLocation={{ rack: "Garage", shelf: "3" }}
                  selectedLocation={selectedLocation}
                />
              )}
              {/* <Dialog visible={showMoveDialog} onDismiss={hideCMDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>This is simple dialog</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideCMDialog}>Done</Button>
                </Dialog.Actions>
              </Dialog> */}
            </Portal>
          </>
        )}
      </View>
    </>
  );
}

{
  /* <Card.Title
title={item.wineText + " - " + item.vintage}
titleNumberOfLines={3}
titleVariant="titleMedium"
/> */
}

export default CellarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-start",
    marginTop: 16,
    padding: 16,
  },
  card: {
    padding: 0,
    marginBottom: 8,
    roundness: 15,
    // height: 80,
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
