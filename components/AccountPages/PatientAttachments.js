import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux'; 
import { format } from 'date-fns';
import { storeUploadedFiles } from '../../redux/actions/authActions';
import RNFS from 'react-native-fs';


const PatientAttachments = () => {

    const dispatch = useDispatch(); 
    const navigation = useNavigation();

    const [showPopup, setShowPopup] = useState({ visible: false, index: null });
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const prevUploadedFiles = useSelector(state => state.auth.uploadedFiles) || [];
    const [deleteIndex, setDeleteIndex] = useState(null); 
    const [popupTop, setPopupTop] = useState(0);
    const [popupLeft, setPopupLeft] = useState(0);
    const [DeleteText, setDeleteText] = useState("Delete");
    const currentDate = format(new Date(), 'yyyy-MM-dd')

    console.log("prevUploadedFiles at start: ", prevUploadedFiles);


    const handleDelete = async (showPopup) => {
        deleteIndex = showPopup.index;
        console.log('Delete index:', deleteIndex);
        if (deleteIndex !== null) {
            const updatedFiles = uploadedFiles.filter((_, index) => index !== deleteIndex);
            setUploadedFiles(updatedFiles);
            console.log('Deleted file at index:', deleteIndex);
            console.log('Updated files:', updatedFiles);
            setShowPopup({ visible: false, index: null });
            setDeleteIndex(null);
        }
    };

    const handleDownload = async (showPopup) => {
        try {
            const fileToDownload = uploadedFiles[showPopup.index];
            const destPath = RNFS.ExternalDirectoryPath + '/' + fileToDownload.name;
            await RNFS.downloadFile({
                fromUrl: fileToDownload.uri,
                toFile: destPath,
            }).promise;
            console.log('File downloaded to:', destPath);
            setShowPopup({ visible: false, index: null });
        } catch (err) {
            console.log('Error downloading file:', err);
        }
    };
    

    const handleGoBack = () => {
        console.log("Uploaded files by closing time: ", uploadedFiles);
        dispatch(storeUploadedFiles(uploadedFiles));
        setUploadedFiles([]);
        navigation.navigate('AppNavigator');
    };

    const handleUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            
            setUploadedFiles(prevUploadedFiles => {
                const newUploadedFiles = [...prevUploadedFiles, res];
                console.log("New uploaded files after each upload: ", newUploadedFiles); 
                return newUploadedFiles;
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Error occurred while picking the file', err);
            }
        }
    };
    
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                onTouchStart={() => setShowPopup({ visible: false, index: null })} 
            >
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPress={() => setShowPopup({ visible: false, index: null })}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <Image source={require('../../assets/goBack.png')} style={styles.headerImage} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Documents</Text>
                    </View>
        
                    {uploadedFiles.length > 0 &&
                        <View style={styles.listContainer}>
                            <Text style={styles.UploadText}>New uploads</Text>
                            {uploadedFiles.flat().map((file, index) => (
                                <View key={index} style={styles.imageUpload}>
                                    <Image source={{ uri: file.uri }} style={styles.image} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.imageTitleText}>{file.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.imageText}>{format(new Date(), 'd MMM, yyyy')} - </Text>
                                            <Text style={styles.imageText}>{(file.size / 1024).toFixed(2)} KB</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={(e) => {
                                        const { pageY, pageX } = e.nativeEvent;
                                        setPopupTop(pageY - 90);
                                        setPopupLeft(pageX - 90);
                                        setDeleteText("Delete")
                                        setShowPopup({ visible: true, index });
                                    }}>
                                        <Text style={styles.dots}>...</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    }

                    { prevUploadedFiles[0] && 
                        <View style={styles.listContainer}>
                            <Text style={styles.UploadText}>Previous uploads</Text>
                            {prevUploadedFiles.flat().map((file, index) => (
                                <View key={index} style={styles.imageUpload}>
                                    <Image source={{ uri: file.uri }} style={styles.image} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.imageTitleText}>{file.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.imageText}>{format(new Date(), 'd MMM, yyyy')} - </Text>
                                            <Text style={styles.imageText}>{(file.size / 1024).toFixed(2)} KB</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={(e) => {
                                        const { pageY, pageX } = e.nativeEvent;
                                        setPopupTop(pageY - 90);
                                        setPopupLeft(pageX - 120);
                                        setDeleteText("Request to delete");
                                        setShowPopup({ visible: true, index });
                                    }}>
                                        <Text style={styles.dots}>...</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    }
                </TouchableOpacity>
        
                <Modal visible={showPopup.visible} transparent={true} animationType='fade'>
                    <View style={[styles.popup, { top: popupTop, left: popupLeft }]}>
                        <TouchableOpacity onPress={() => handleDelete(showPopup)} style={styles.popupItem}>
                            <Text>{DeleteText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDownload(showPopup)} style={styles.popupItem}>
                            <Text>Download</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </ScrollView>

            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Image source={require('../../assets/file_upload.png')} style={styles.uploadImage} />
                <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
        </View>
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
        color: '#151515', 
        fontSize: 18, 
        fontFamily: 'Source Sans Pro', 
        fontWeight: '800', 
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 80,
    },
    headerImage: {
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    listContainer: {
        paddingHorizontal: 16,
        marginTop: 20,
        borderBottomColor: '#dfdfdf',
    },
    imageUpload: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    imageTitleText: {
        fontSize: 16,
        flex: 1,
        fontWeight: '700',
    },
    imageText: {
        fontSize: 16,
    },
    dots: {
        fontSize: 24,
        paddingHorizontal: 5,
        fontWeight: 'bold',
    },
    uploadButton: {
        marginTop: 20,
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
        width: 140,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 10,
    },
    UploadText: {
        fontSize: 16,
        color: '#151515',
        fontWeight: 'bold',
        marginBottom: 10,
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

