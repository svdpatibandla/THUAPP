import React from 'react';
import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import config from './auth0-configuration';
import { useNavigation } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import NewPatientForm from './NewPatientForm';

const Home = () => {
  const navigation = useNavigation();
  const { authorize, clearSession, user, getCredentials, error, isLoading } = useAuth0();

  const onLogin = async (userType) => {
    console.log(`Attempting to log in as ${userType} user...`);

    await authorize({}, {});

    console.log('Logged in successfully!');
    const credentials = await getCredentials();
    console.log('AccessToken:', credentials?.accessToken);
    console.log(user);

    if (userType === 'New') {
      navigation.navigate('NewPatientForm');
    } else if (userType === 'existing') {
      navigation.navigate('AppNavigator');
    }
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    console.log('Logging out...');
    await clearSession({}, {});
    console.log('Logged out successfully!');
  };

  if (isLoading) {
    return <View style={styles.container}><Text>Loading</Text></View>;
  }

  if (loggedIn) {
    console.log('User Information:', user);
  }
 
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => onLogin('New')}
      >
        <Text style={styles.text}>New Patient</Text>
        <Image source={require('../assets/arrow.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() => onLogin('existing')}
      >
        <Text style={styles.text}>Existing Patient</Text>
        <Image source={require('../assets/arrow.png')} style={styles.image} />
      </TouchableOpacity>

      {user && <Text>You are logged in as {user.name}</Text>}
      {!user && <Text>You are not logged in</Text>}

      <Button
        onPress={onLogout}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />

      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const Login = () => {
  console.log('Rendering Login component...');

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C'
  },
  box: {
    borderWidth: 2,
    borderColor: '#c8e1ff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    flex: 1, // Add this line to make text centered
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

// Export the Login component
export default Login;
