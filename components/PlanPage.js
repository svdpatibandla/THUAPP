import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MentalContent from './MentalContentPage';
import MedicalContent from './MedicalContentPage';

const PlanPage = () => {
  const [activeButton, setActiveButton] = useState('MentalButton');

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeButton === 'MentalButton' ? styles.activeButton : null]}
          onPress={() => handleButtonPress('MentalButton')}
        >
          <Text style={[styles.buttonText, activeButton === 'MentalButton' ? styles.activeButtonText : null]}>
            Mental Health
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeButton === 'MedicalButton' ? styles.activeButton : null]}
          onPress={() => handleButtonPress('MedicalButton')}
        >
          <Text style={[styles.buttonText, activeButton === 'MedicalButton' ? styles.activeButtonText : null]}>
            Medical Health
          </Text>
        </TouchableOpacity>
      </View>
      {activeButton === 'MentalButton' && <MentalContent />}
      {activeButton === 'MedicalButton' && <MedicalContent />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#3498db', 
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    padding: 0,
    marginHorizontal: 0,
    borderRadius: 20,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: '#3498db',
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default PlanPage;
