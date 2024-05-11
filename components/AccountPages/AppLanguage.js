import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AppLanguage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Personal Info</Text>
                <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.EditText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
});

export default AppLanguage;
