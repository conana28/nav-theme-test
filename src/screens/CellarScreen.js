import {
  Searchbar,
  Menu,
  Divider,
  Portal,
  HelperText,
  Card,
  Title,
} from "react-native-paper";
import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { searchBottles } from "../util/https";
import { FlatList } from "react-native";
import CellarConsumeDialog from "./Dialogs/CellarConsumeDialog";
import CellarMoveDialog from "./Dialogs/CellarMoveDialog";
import CellarEditDialog from "./Dialogs/CellarEditDialog";

function CellarScreen() {
  const [searchQuery, setSearchQuery] = React.useState(""); // Search bar contents
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]); // Search results
  const [selectedId, setSelectedId] = React.useState(""); // id of bottle selected
  const [selectedWineText, setSelectedWineText] = React.useState(""); // text of bottle selected
  const [selectedLocation, setSelectedLocation] = React.useState({
    rack: "RACK",
    shelf: "SHELF",
  });

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

  // Move
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

  // Edit / Delete
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const hideEditDialog = () => setShowEditDialog(false);
  const editPressed = () => {
    closeMenu();
    setShowEditDialog(true); // Go to edit dialog
  };

  const [showConsumeDialog, setShowConsumeDialog] = React.useState(false);
  const hideDialog = () => setShowConsumeDialog(false);

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
          placeholder="Bottle search"
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
              <Menu.Item onPress={editPressed} title="Edit" />
            </Menu>

            <Portal>
              {/* Consume Dialog */}
              {showConsumeDialog && (
                <CellarConsumeDialog
                  showConsumeDialog={showConsumeDialog}
                  hideDialog={hideDialog}
                  selectedId={selectedId}
                  selectedWineText={selectedWineText}
                  setSearchQuery={setSearchQuery}
                  setSearchResults={setSearchResults}
                />
              )}
              {/* Move Dialog */}
              {showMoveDialog && (
                <CellarMoveDialog
                  showMoveDialog={showMoveDialog}
                  hideCMDialog={hideCMDialog}
                  selectedWineText={selectedWineText}
                  selectedLocation={selectedLocation}
                />
              )}
              {showEditDialog && (
                <CellarEditDialog
                  showEditDialog={showEditDialog}
                  hideEditDialog={hideEditDialog}
                  selectedId={selectedId}
                  selectedWineText={selectedWineText}
                  setSearchQuery={setSearchQuery}
                  setSearchResults={setSearchResults}
                />
              )}
            </Portal>
          </>
        )}
      </View>
    </>
  );
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
