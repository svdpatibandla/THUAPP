import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import { AuthContext } from "./AuthContext_temp";
const LandingPage = ({ navigation }) => {

    const { loggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (loggedIn) {
        navigation.dispatch(StackActions.replace("AppNavigator"));
        }
    }, [loggedIn]);

    const { login } = useContext(AuthContext);

    const handleButtonClick = (option) => {
        if (option === 'New Patient') {
          navigation.navigate('NewPatientForm');
        } else if (option === 'Existing Patient') {
          console.log('Handle action for Existing Patient');
        }
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.box}
            onPress={() => handleButtonClick('New Patient')}
        >
            <Text style={styles.text}>New Patient</Text>
            <Image
            source={require('../assets/arrow.png')}
            style={styles.image}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.box}
            onPress={() => handleButtonClick('Existing Patient')}
        >
            <Text style={styles.text}>Existing Patient</Text>
            <Image
            source={require('../assets/arrow.png')}
            style={styles.image}
            />
        </TouchableOpacity>
        </View>
    );
};

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
      flex: 1, 
    },
    image: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
  });
  

export default LandingPage;
