import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { StackActions } from "@react-navigation/native";

import { AuthContext } from "./AuthContext";

function LoadingScreen({ navigation }) {
  const { loading, loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn === true) {
      navigation.dispatch(StackActions.replace("Account"));
    } else if (loggedIn === false) {
      navigation.dispatch(StackActions.replace("Login"));
    }
  }, [loggedIn, navigation]);

  return (
    <View style={styles.container}>
      {loading && (
        <>
          <ActivityIndicator size="large" />
          <View style={{ marginTop: 10 }}>
            <Text>Please wait...</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
