// MentalContentPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';


const MedicalContent = () => {
  return (
    <View style={styles.container}>
      <Text>Content for Button 1</Text>
      {/* Add more content as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MedicalContent;
