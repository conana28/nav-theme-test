import * as React from "react";
import { Button, View, Text } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useTheme } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import CellarScreen from "./screens/CellarScreen";
import TestScreen from "./screens/TestScreen";
import {
  useTheme,
  Appbar,
  TouchableRipple,
  Switch,
  Menu,
} from "react-native-paper";
import { PreferencesContext } from "../src/PreferencesContext";

function CustomNavigationBar({ navigation, back, route, options }) {
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  // console.log("Back: ", back);
  // console.log(route);
  // console.log(options);

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header
      // elevated={true}
      // mode={"small"}
      style={{ backgroundColor: theme.colors.secondaryContainer, height: 32 }}
    >
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
      {/* <TouchableRipple > */}
      {/* Touchable ripple wasn't working on web ? with rc.8*/}
      <Switch
        value={isThemeDark}
        onValueChange={() => {
          console.log("Toggle");
          toggleTheme();
        }}
      />
      {/* </TouchableRipple> */}
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="menu"
              // color={theme.colors.primary}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              setVisible(false);
              navigation.navigate("Test");
            }}
            title="Test"
          />
          <Menu.Item
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              setVisible(false);
              navigation.navigate("Details", {
                itemId: 86,
                title: "anything you want here",
              });
            }}
            title="Details"
          />
          <Menu.Item
            onPress={() => {
              console.log("Option 3 was pressed");
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Cellar" component={CellarScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </>
  );
}

export default App;
