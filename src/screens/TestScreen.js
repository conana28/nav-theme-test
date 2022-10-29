import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import React from "react";

const TestScreen = () => {
  const theme = useTheme();
  return (
    <View>
      <Text variant="headlineLarge" style={{ color: theme.colors.tertiary }}>
        TestScreen
      </Text>
    </View>
  );
};

export default TestScreen;
