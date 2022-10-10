import { View, Text } from "react-native";
import React from "react";
// import { useTheme } from "@react-navigation/native";
import { useTheme, Button } from "react-native-paper";
// import { Button } from "react-native-paper";

const DetailScreen = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params; // Get the param

  const { colors } = useTheme();
  // console.log(colors);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: colors.primary, marginBottom: 16 }}>
        Details Screen
      </Text>
      <Text style={{ color: colors.secondary }}>
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
