import * as React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import {
  Avatar,
  Text,
  IconButton,
  MD3Colors,
  useTheme,
} from "react-native-paper";
import LandingPic from "../assets/bubbles2.jpg";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const homeColor = "#ad9595c0";

const MyComponent = ({ navigation }) => {
  const theme = useTheme();
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={LandingPic}
          resizeMode="cover"
          style={styles.image}
        >
          <Text
            variant="displayLarge"
            style={{
              marginTop: 124,
              // fontSize: 36,
              fontWeight: "700",
              textAlign: "center",
              color: theme.colors.primaryContainer,
              // backgroundColor: theme.colors.onPrimary,
            }}
          >
            Winetrak-M
          </Text>

          <View
            style={{
              flex: 1,
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              mode="contained"
              // icon={require("../assets/bottle-of-wine-alcohol-bottle-wine-svgrepo-com.svg")}
              icon={"fruit-grapes"}
              size={40}
              iconColor={theme.colors.onTertiaryContainer}
              onPress={() => {
                navigation.navigate("Wine");
              }}
            />
            <IconButton
              mode="contained"
              icon={"bottle-wine"}
              size={40}
              iconColor={theme.colors.onTertiaryContainer}
              onPress={() => {
                navigation.navigate("Cellar");
              }}
            />
          </View>
          <View
            style={{
              flex: 4,
            }}
          />
        </ImageBackground>
      </View>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    // color: homeColor,
    // color: theme.colors.tertiary,
    fontSize: 36,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 124,
    // backgroundColor: "#000000c0",
  },
});
