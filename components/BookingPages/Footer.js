// Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Footer = ({ onPress1, onPress2 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress1} style={styles.button}>
        <Image source={require('./path/to/image1.png')} style={styles.image} />
        <Text style={styles.text}>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress2} style={styles.button}>
        <Image source={require('./path/to/image2.png')} style={styles.image} />
        <Text style={styles.text}>Button 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  button: {
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    color: 'blue',
  },
});

export default Footer;
