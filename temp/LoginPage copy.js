// components/Home.js
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const Home = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userInfo = response.json();
    setUser(userInfo);
  }

  const showUserInfo = () => {
    if (user) {
      return (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Welcome</Text>
          <Image source={{ uri: user.picture }} style={styles.userImage} />
          <Text style={styles.userInfoText}>{user.name}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {user && showUserInfo()}
      {user === null && (
        <>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
            style={styles.loginButton}
          >
            <Image source={require('../assets/signinwithgoogle.png')} style={styles.loginButtonImage} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
  },
  loginButton: {
    marginTop: 10,
  },
  loginButtonImage: {
    width: 250,
    height: 80,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Home;
