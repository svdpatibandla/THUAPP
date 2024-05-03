import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';

const Header = (props) => {

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={props.handleBack}>
          <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Speciality, Practitioners"
            textAlign='center'
            value={props.searchQuery}
            onChangeText={props.setSearchQuery}
          />
          <Image source={require('../../assets/search.png')} style={styles.searchImage} />
          <Image source={require('../../assets/mic.png')} style={styles.micImage} />
        </View>
        <TouchableOpacity onPress={props.handleClose}>
          <Image source={require('../../assets/cancel.png')} style={styles.headerImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    borderBottomColor: '#dfdfdf',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
  },
  headerImage: {
    width: 24,
    height: 24,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    justifyContent: 'center',
    textAlign: 'center',
  },
  micImage: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
    paddingRight: 10,
  },
  searchImage: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 10,
    paddingLeft: 10,
  },
  filterImage: {
    width: 24,
    height: 24,
  },
  leftItemText: {
    color: '#151515',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    lineHeight: 24,
  },
});

export default Header;
