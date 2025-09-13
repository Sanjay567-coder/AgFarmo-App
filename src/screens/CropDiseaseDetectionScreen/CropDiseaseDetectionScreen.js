import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Platform, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

// Mock machine learning model function
function predictDisease(imageData) {
    // Implement mock prediction logic here (e.g., random prediction)
    const diseases = t('diseases', { returnObjects: true });
    const randomIndex = Math.floor(Math.random() * diseases.length);
    return diseases[randomIndex];
}

const CropDiseaseDetectionScreen = () => {
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const { t } = useTranslation();

    useEffect(() => {
        requestPermissions();
    }, []);

    async function requestPermissions() {
        if (Platform.OS !== 'web') {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
            if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
                Alert.alert(t('permissionErrorTitle'), t('cameraOrMediaLibraryPermissionNotGranted'));
            }
        }
    }

    async function takeLivePicture() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(t('permissionErrorTitle'), t('cameraPermissionNotGranted'));
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    }

    async function pickImage() {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(t('permissionErrorTitle'), t('mediaLibraryPermissionNotGranted'));
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    }

    function processImage() {
        if (!image) {
            Alert.alert(t('pleaseUploadImageAlert'));
            return;
        }
        const predictedDisease = predictDisease(image);
        Alert.alert(t('predictedDiseaseAlertTitle'), predictedDisease);
    }

    return (
        <ScrollView style={{backgroundColor:'#FAF3E0'}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={33} color="black" />
                    <Text style={{ top: -31, left: 35, fontSize: 17.5, fontWeight: 'bold' }}>{t('backButtonText')}</Text>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>{t('title1')}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={takeLivePicture}>
                    <AntDesign name="camerao" size={24} color="white" />
                    <Text style={styles.buttonText}>{t('takeLivePictureButtonText')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <AntDesign name="folderopen" size={24} color="white" />
                    <Text style={styles.buttonText}>{t('pickImageButtonText')}</Text>
                </TouchableOpacity>
                {image && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                )}
                <TouchableOpacity style={[styles.button, { backgroundColor: image ? '#007bff' : '#ced4da' }]} onPress={processImage} disabled={!image}>
                    <AntDesign name="check" size={24} color="white" />
                    <Text style={[styles.buttonText, { color: 'white' }]}>{t('processImageButtonText')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 250,
        resizeMode: 'contain',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-50
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1, // Ensure the button is above other elements
        marginTop: 30,
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
});

export default CropDiseaseDetectionScreen;