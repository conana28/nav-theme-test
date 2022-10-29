import { View } from "react-native";
import React from "react";
// import { useTheme } from "@react-navigation/native";
import { useTheme, Text, Button } from "react-native-paper";
import { PreferencesContext } from "../PreferencesContext";

const HomeScreen = ({ navigation }) => {
  //   const { colors } = useTheme();
  //   const theme = useTheme();

  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          variant="headlineLarge"
          theme={{
            colors: {
              primary: theme?.colors.surface,
            },
          }}
          style={{ marginBottom: 16 }}
        >
          Home Screen
        </Text>

        <Button
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("Details", {
              itemId: 86,
              title: "anything you want here",
            });
          }}
          mode="contained"
          dark
        >
          Go to Details
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Cellar");
          }}
          mode="contained-tonal"
          theme={{ roundness: 2 }}
          //   dark
        >
          Cellar
        </Button>

        <Button
          onPress={() => {
            navigation.navigate("Test");
          }}
          mode="contained-tonal"
          theme={{ roundness: 2 }}
        >
          Test
        </Button>
      </View>
    </>
  );
};

export default HomeScreen;
