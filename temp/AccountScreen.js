// /src/screens/AccountScreen.js

import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, withTheme } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

import { AuthContext } from "./AuthContext";

const AccountScreen = ({ navigation, theme }) => {
  const { logout, loggedIn, userData } = useContext(AuthContext);
  const { colors } = theme;

  useEffect(() => {
    if (loggedIn === false) {
      navigation.dispatch(StackActions.replace("Login"));
    }
  }, [loggedIn]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {userData && (
        <View style={styles.userContainer}>
          <Avatar.Image size={100} source={{ uri: userData.picture }} />
          <View style={styles.textContainer}>
            <Text>{userData.name}</Text>
          </View>
        </View>
      )}

      <Button mode="contained" onPress={() => logout()}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 10
  },
});

export default withTheme(AccountScreen);