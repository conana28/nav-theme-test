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
  console.log("Back: ", back);
  console.log(route);
  console.log(options);

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
      <TouchableRipple
      // onPress={() => {
      //   console.log("Switch pressed");
      //   toggleTheme();
      // }}
      >
        <Switch
          value={isThemeDark}
          onValueChange={() => {
            toggleTheme();
          }}
        />
        {/* <Switch
          value={isSwitchOn}
          onValueChange={() => {
            setIsSwitchOn(!isSwitchOn);
          }}
        /> */}
        {/* <Text>aaa</Text> */}
        {/* <Switch
          style={[{ backgroundColor: theme.colors.accent }]}
          value={isThemeDark}
        /> */}
      </TouchableRipple>
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
              console.log("Option 1 was pressed");
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log("Option 2 was pressed");
            }}
            title="Option 2"
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
      </Stack.Navigator>
    </>
  );
}

export default App;
