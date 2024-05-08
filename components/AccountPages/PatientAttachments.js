import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux'; 
import { format } from 'date-fns';



const PatientAttachments = () => {

    const [showPopup, setShowPopup] = useState({ visible: false, index: null });
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [prevUploadedFiles, setPrevUploadedFiles] = useState(useSelector(state => state.auth.uploadedFiles)) || []; 
    const [deleteIndex, setDeleteIndex] = useState(null); 
    const [popupTop, setPopupTop] = useState(0);
    const [popupLeft, setPopupLeft] = useState(0);
    const currentDate = format(new Date(), 'yyyy-MM-dd')

    const navigation = useNavigation();

    const handleDelete = (deleteIndex) => {

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
    

    const handleDownload = (showPopup) => {
        console.log("showPopup: ", showPopup);  
        setShowPopup({ visible: false, index: null });
    };
    
    const dispatch = useDispatch(); 

    const handleGoBack = () => {
        console.log("Uploaded files by closing time: ", uploadedFiles);
        dispatch(setUploadedFiles(uploadedFiles));
        setPrevUploadedFiles(prevUploadedFiles => [...(prevUploadedFiles || []), ...uploadedFiles]);
        console.log("Final files by closing time: ", prevUploadedFiles);
        setUploadedFiles([]);
        navigation.navigate('AccountPage');
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
    
                <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                    <Image source={require('../../assets/file_upload.png')} style={styles.uploadImage} />
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
    
                {uploadedFiles.length > 0 &&
                    <View style={styles.listContainer}>
                        <Text style={styles.UploadText}>Recent Uploads</Text>
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
                                    setShowPopup({ visible: true, index });
                                }}>
                                    <Text style={styles.dots}>...</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                }

                { prevUploadedFiles > 0 && 
                    <View style={styles.listContainer}>
                        <Text style={styles.UploadText}>Previously Uploaded</Text>
                        {prevUploadedFiles.flat().map((file, index) => (
                            <View key={index} style={styles.imageUpload}>
                                <Image source={{ uri: file.uri }} style={styles.image} />
                                <Text style={styles.imageText}>{file.name}</Text>
                                <TouchableOpacity onPress={(e) => {
                                    const { pageY, pageX } = e.nativeEvent;
                                    setPopupTop(pageY - 90);
                                    setPopupLeft(pageX - 90);
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
                    <TouchableOpacity onPress={() => handleDelete(showPopup.index)} style={styles.popupItem}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDownload(showPopup)} style={styles.popupItem}>
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
        marginRight: 10,
    },
    imageTitleText: {
        fontSize: 16,
        flex: 1,
    },
    imageText: {
        fontSize: 16,
    },
    dots: {
        fontSize: 24,
        paddingHorizontal: 5,
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
        marginBottom: 20,
        width: 140
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

