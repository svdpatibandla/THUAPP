import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import config from './auth0-configuration';

const LandingPage = ({ navigation }) => {
  const { authorize } = useAuth0();

  const handleButtonClick = async (option) => {
    console.log(`Button clicked: ${option}`);

    if (option === 'New Patient') {
      await authorize();
      console.log('Authorization successful');
      navigation.navigate('NewPatientForm');
    } else if (option === 'Existing Patient') {
      console.log('User chose Existing Patient');
      navigation.navigate('AppNavigator');
    }
  };

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      {console.log('Auth0Provider is rendered')}
      
      <View style={styles.container}>
        {console.log('Main container view is rendered')}
        
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleButtonClick('New Patient')}
        >
          {console.log('New Patient button is rendered')}
          
          <Text style={styles.text}>New Patient</Text>
          <Image source={require('../assets/arrow.png')} style={styles.image} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleButtonClick('Existing Patient')}
        >
          {console.log('Existing Patient button is rendered')}
          
          <Text style={styles.text}>Existing Patient</Text>
          <Image source={require('../assets/arrow.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </Auth0Provider>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
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

// Export the LandingPage component
export default LandingPage;
