import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {
  Searchbar,
  HelperText,
  Card,
  Title,
  Menu,
  Divider,
  Badge,
  Portal,
} from "react-native-paper";
import { searchWines } from "../util/https";
import WineAddBottleDialog from "./Dialogs/WineAddBottleDialog";
import WineShowNotesDialog from "./Dialogs/WineShowNotesDialog";

const WineScreen = () => {
  /* Search Bar */
  const [searchQuery, setSearchQuery] = React.useState(""); // Search bar contents
  const [searchResults, setSearchResults] = React.useState([]); // Search results
  const [searchLoading, setSearchLoading] = React.useState(false);
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
      setShowHelpText(true);
      setShowHelpError(false);
      const wine = query.slice(commaPosition);
      if (wine.length === 0) {
        setShowHelpError(true);
      }
    }
  };
  // Process search wine string
  const searchWine = async () => {
    console.log("searchWine: ", searchQuery);
    if (searchQuery.length === 0) {
      return;
    }
    const comma = searchQuery.indexOf(",");
    let searchProducer = "";
    let searchWineName = "";
    let searchObj = {};

    if (comma === -1) {
      searchProducer = searchQuery;
      searchObj = { producer: searchProducer };
    } else {
      searchProducer = searchQuery.substring(0, comma);
      searchWineName = searchQuery.substring(comma + 1);
      searchObj = { producer: searchProducer, wineName: searchWineName };
    }

    setSearchLoading((prev) => true);

    const b = await searchWines(searchObj);
    console.log(searchObj, b);
    setSearchResults(b);
    setSearchLoading((prev) => false);
  };

  // Menu item pressed
  const [selectedWineId, setSelectedWineId] = React.useState(""); // id of wine selected
  const [selectedWineWineId, setSelectedWineWineId] = React.useState(""); // wineId of wine selected
  const [selectedWineText, setSelectedWineText] = React.useState(""); // text of wine selected
  const [selectedWineCountry, setSelectedWineCountry] = React.useState(""); // text of wine selected

  const itemPressed = (event, id, wText, wCountry, wWineId) => {
    console.log(wText);
    setSelectedWineId(id);
    setSelectedWineWineId(wWineId);
    setSelectedWineText(wText);
    setSelectedWineCountry(wCountry);
    setMenuLocation({ x: 380, y: Math.ceil(event.nativeEvent.pageY) });
    openMenu();
  };

  // Action Menu
  const [visible, setVisible] = React.useState(false);
  const [menuLocation, setMenuLocation] = React.useState({ x: 100, y: 100 });
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Add Bottle
  const [showAddBottleDialog, setShowAddBottleDialog] = React.useState(false);
  const hideAddDialog = () => {
    // setSearchResults("");
    setShowAddBottleDialog(false);
  };
  const addBottlePressed = () => {
    closeMenu();
    // setSearchResults("");
    setShowAddBottleDialog(true); // Go to edit dialog
  };

  //Show Notes
  const [showNotesDialog, setShowNotesDialog] = React.useState(false);
  const showNotesPressed = () => {
    closeMenu();
    // setSearchResults("");
    setShowNotesDialog(true); // Go to edit dialog
  };
  const hideShowDialog = () => {
    // setSearchResults("");
    setShowNotesDialog(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Searchbar
          placeholder="Wine search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={searchWine}
          loading={searchLoading}
          style={{ width: "100%" }}
        />
        {showHelpError && (
          <HelperText type="error" visible={showHelpError}>
            No wine entered
          </HelperText>
        )}

        {showHelpText && (
          <HelperText type="info" visible={showHelpText}>
            Format: Producer,Wine
          </HelperText>
        )}

        {searchResults?.length > 0 && (
          <>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={(e) => {
                    itemPressed(
                      e,
                      item._id,
                      item.producer + " " + item.wineName,
                      item.country,
                      item.wineId ? item.wineId : "9999"
                    );
                  }}
                >
                  <Card elevation={2} style={styles.card} mode={"elevated"}>
                    <Card.Content>
                      <>
                        <Title>
                          {item.producer + " " + item.wineName + " "}
                        </Title>
                        <Badge size={30} style={{ marginTop: -30 }}>
                          {item.bottles?.length}
                        </Badge>
                      </>
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
              <Menu.Item onPress={addBottlePressed} title="Add bottle" />
              <Menu.Item onPress={showNotesPressed} title="Show Notes" />
              <Divider />
              <Menu.Item title="TBC" />
            </Menu>

            <Portal>
              {/* Add Bottle Dialog */}
              {showAddBottleDialog && (
                <WineAddBottleDialog
                  showAddBottleDialog={showAddBottleDialog}
                  hideAddDialog={hideAddDialog}
                  selectedWineText={selectedWineText}
                  selectedWineCountry={selectedWineCountry}
                  selectedWineWineId={selectedWineWineId}
                  selectedWineId={selectedWineId}
                  setSearchResults={setSearchResults}
                />
              )}
              {/* Show Notes Dialog */}
              {showNotesDialog && (
                <WineShowNotesDialog
                  showNotesDialog={showNotesDialog}
                  hideShowDialog={hideShowDialog}
                  selectedWineText={selectedWineText}
                  // selectedWineCountry={selectedWineCountry}
                  // // selectedWineWineId={selectedWineWineId}
                  selectedWineId={selectedWineId}
                  // setSearchResults={setSearchResults}
                />
              )}
            </Portal>
          </>
        )}
      </View>
    </>
  );
};

export default WineScreen;

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
