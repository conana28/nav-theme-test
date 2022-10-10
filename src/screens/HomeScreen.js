import { View, Text, Button } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: colors.text, marginBottom: 16 }}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          });
        }}
      />
    </View>
  );
};

export default HomeScreen;
