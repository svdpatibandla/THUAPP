import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const PatientLanguage_Edit = ({ route }) => {

    const [primaryLanguage, setPrimaryLanguage] = useState('');
    const [otherLanguages, setOtherLanguages] = useState([]);
    const [noOtherLanguage, setNoOtherLanguage] = useState(false);
    const navigation = useNavigation();

    const translations = useSelector(state => state.auth.translations);

    const handleLanguageSelection = (language) => {
        setSelectedLanguage(language);
      };

    const handleClose = () => {
        navigation.goBack();
    }

    const handleContinue = () => {
        navigation.navigate('AccountPage');
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{translations.languages}</Text>
                <TouchableOpacity onPress={handleClose}>
                <Image source={require('../../assets/cancel.png')} style={styles.headerImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.InfoContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Complete the registration</Text>
                    <Text style={styles.subtitle}>
                        Add information about yourself that will be linked to patientemail@gmail.com
                    </Text>
                    <Text style={styles.note}>Fields marked with * are required</Text>
                </View>
                <Text style={styles.label}>The first language of communication*</Text>
                <View>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => handlePrimaryLanguageChange('ukrainian')}
                >
                    <View
                        style={[
                        styles.radioCircle,
                        primaryLanguage === 'ukrainian' && styles.checkboxDot,
                        ]}
                    />
                    <Text style={[styles.radioLabel, primaryLanguage === 'ukrainian' && styles.selectedText]}>Українська мова</Text>  
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => handlePrimaryLanguageChange('russian')}
                >
                    <View
                        style={[
                        styles.radioCircle,
                        primaryLanguage === 'russian' && styles.selectedRadio,
                        ]}
                    />
                    <Text style={[styles.radioLabel, primaryLanguage === 'russian' && styles.selectedText]}>Русский язык</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => handlePrimaryLanguageChange('english')}
                >
                <View
                    style={[
                    styles.radioCircle,
                    primaryLanguage === 'english' && styles.selectedRadio,
                    ]}
                />
                    <Text style={[styles.radioLabel, primaryLanguage === 'english' && styles.selectedText]}>English language</Text>
                </TouchableOpacity>
            </View>
            {primaryLanguage && (
                <>
                <View style={[styles.switchContainer, { justifyContent: 'space-between' }]}>
                    <Text style={styles.switchLabel}>no other language</Text>
                    <Switch
                    value={noOtherLanguage}
                    onValueChange={toggleNoOtherLanguage}
                    style={[styles.switch, noOtherLanguage && styles.selectedSwitch]}
                    />
                </View>
                <Text style={styles.label}>Another language of communication*</Text>
                <View>
                    <TouchableOpacity
                    style={styles.checkboxButton}
                    onPress={() => handleOtherLanguageChange('russian')}
                    disabled={noOtherLanguage}
                    >
                    <View
                        style={[
                        styles.checkboxCircle,
                        otherLanguages.includes('russian') && styles.selectedCheckbox,
                        noOtherLanguage && styles.disabledCheckbox,
                        ]}
                    >
                        {otherLanguages.includes('russian') && <View style={styles.checkboxDot} />}
                    </View>
                    <Text
                        style={[
                        styles.checkboxLabel,
                        otherLanguages.includes('russian') && styles.selectedText,
                        noOtherLanguage && styles.disabledCheckboxLabel,
                        ]}
                    >
                        Russian language
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.checkboxButton}
                    onPress={() => handleOtherLanguageChange('english')}
                    disabled={noOtherLanguage}
                    >
                    <View
                        style={[
                        styles.checkboxCircle,
                        otherLanguages.includes('english') && styles.selectedCheckbox,
                        noOtherLanguage && styles.disabledCheckbox,
                        ]}
                    >
                        {otherLanguages.includes('english') && <View style={styles.checkboxDot} />}
                    </View>
                    <Text
                        style={[
                        styles.checkboxLabel,
                        otherLanguages.includes('english') && styles.selectedText,
                        noOtherLanguage && styles.disabledCheckboxLabel,
                        ]}
                    >
                        English language (Advanced)
                    </Text>
                    </TouchableOpacity>
                </View>
                </>
            )}
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            </View>
        </View>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: '#dfdfdf',
        backgroundColor: '#ffffff',
        paddingHorizontal: 14,
        borderBottomWidth: 1,
      },
      headerImage: {
        width: 24,
        height: 24,
      },
      headerText: {
        color: '#151515', 
        fontSize: 18, 
        fontFamily: 'Source Sans Pro', 
        fontWeight: '800', 
        lineHeight: 28,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
});

export default PatientLanguage_Edit;
