import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PatientAttachments = () => {
    const navigation = useNavigation();
    const [showPopup, setShowPopup] = useState(false);

    const handleClose = () => {
        navigation.navigate('AccountPage');
    };

    const handleDelete = () => {
        // Handle delete functionality
        setShowPopup(false);
    };

    const handleDownload = () => {
        // Handle download functionality
        setShowPopup(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose}>
                    <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Documents</Text>
            </View>
            <View style={styles.listContainer}>
                {/* List of recent image uploads */}
                <View style={styles.imageUpload}>
                    <Image source={require('../../assets/arrow.png')} style={styles.image} />
                    <Text style={styles.imageText}>Image 1</Text>
                    <TouchableOpacity onPress={() => setShowPopup(true)}>
                        <Text style={styles.dots}>...</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.uploadButton}>
                <Image source={require('../../assets/file_upload.png')} style={styles.uploadImage} />
                <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>

            <Modal visible={showPopup} transparent={true} animationType='fade'>
                <View style={styles.popup}>
                    <TouchableOpacity onPress={handleDelete} style={styles.popupItem}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDownload} style={styles.popupItem}>
                        <Text>Download</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomColor: '#dfdfdf',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    headerImage: {
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    listContainer: {
        paddingHorizontal: 16,
        marginTop: 20,
    },
    imageUpload: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    imageText: {
        flex: 1,
        fontSize: 16,
    },
    dots: {
        fontSize: 24,
        paddingHorizontal: 5,
    },
    uploadButton: {
        backgroundColor: '#3269bd',
        alignItems: 'center',
        marginHorizontal: 16,
        justifyContent: 'center',
        paddingLeft: 12,
        paddingRight: 16,
        paddingVertical: 8,
        borderRadius: 4,
        overflow: 'hidden',
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
        width: 140
    },
    uploadImage: {
        width: 20,
        height: 20,
        paddingRight: 8,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 16,
    },
    popup: {
        position: 'absolute',
        top: 70,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 3,
    },
    popupItem: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
});

export default PatientAttachments;
