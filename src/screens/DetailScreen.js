import { useTheme, Button, Text } from "react-native-paper";
import { View } from "react-native";
import React from "react";
// import { useTheme } from "@react-navigation/native";
// import { Button } from "react-native-paper";
import { PreferencesContext } from "../PreferencesContext";

const DetailScreen = ({ route, navigation }) => {
  console.log("Route: ", route);
  console.log("Navigation: ", navigation);
  const { itemId, otherParam } = route.params; // Get the param

  const { colors } = useTheme();

  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  console.log("Is Dark theme: ", isThemeDark);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        variant="titleLarge"
        style={{ marginBottom: 8 }}
        onPress={() => console.log("Pressed")}
      >
        Details Screen
      </Text>
      <Text variant="bodyLarge" style={{ color: colors.secondary }}>
        itemId: {JSON.stringify(itemId)}
      </Text>
      <Text style={{ color: colors.tertiary }}>
        otherParam: {JSON.stringify(otherParam)}
      </Text>

      <Button
        style={{ marginTop: 16, marginBottom: 16 }}
        buttonColor={colors.tertiary}
        mode={"contained"}
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
            title: "Details+1",
          })
        }
      >
        "Go to Details... again!"
      </Button>
      <Button
        style={{ marginBottom: 16 }}
        buttonColor={colors.error}
        textColor={"white"}
        onPress={() => navigation.navigate("Home")}
        mode="outlined"
      >
        "Go to Home"
      </Button>
      <Button
        onPress={() => navigation.goBack()}
        // raised
        mode="contained-tonal"
        theme={{ roundness: 10 }}
      >
        "Go Back"
      </Button>
    </View>
  );
};

export default DetailScreen;
