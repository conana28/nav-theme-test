import * as React from "react";
// import { AppRegistry } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { registerRootComponent } from "expo";
// import { Provider as PaperProvider } from "react-native-paper";
// import { name as appName } from "./app.json";
import App from "./src/App";
import {
  MD3LightTheme as PaperTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const theme = {
  ...PaperTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...PaperTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

export default function Main() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
}

// AppRegistry.registerComponent(appName, () => Main);
registerRootComponent(Main);
