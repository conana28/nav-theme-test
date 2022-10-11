import * as React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import merge from "deepmerge";

import { PreferencesContext } from "./src/PreferencesContext";
import { registerRootComponent } from "expo";
import App from "./src/App";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

// const theme = {
//   ...PaperTheme,
//   roundness: 2,
//   version: 3,
//   // colors: {
//   //   ...PaperTheme.colors,
//   //   primary: "#3498db",
//   //   secondary: "#f1c40f",
//   //   tertiary: "#a1b2c3",
//   // },
// };

export default function Main() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

registerRootComponent(Main);
