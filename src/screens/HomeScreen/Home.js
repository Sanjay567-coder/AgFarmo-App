import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Linking } from 'react-native';
import Modal from 'react-native-modal';
import DarkModeToggle from './DarkModeToggle';
import NotificationSettings from './NotificationSettings';
import { useTranslation } from 'react-i18next';
import i18next from './i8next';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [showSettings, setShowSettings] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [flickerBorderColor, setFlickerBorderColor] = useState(true);
  const [logoSource, setLogoSource] = useState(require('../../../assets/logo.png'));
  const darkLogoSource = require('../../../assets/dark_logo.png');

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const signOut = async () => {
    try {
      await Auth.signOut();
      displayNotification(t('signedOutSuccessfully'), t('notifications'));
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigateTo = (screen, screenName) => {
    if (screen === 'https://thingspeak.com/channels/2324388') {
      Linking.openURL(screen);
    } else {
      navigation.navigate(screen);
    }
    displayNotification(t('openedSuccessfully', { screenName }), t('notifications'));
  };

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlickerBorderColor(prev => !prev);
    }, 500);

    return () => clearInterval(flickerInterval);
  }, []);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    setLogoSource(darkModeEnabled ? require('../../../assets/logo.png') : require('../../../assets/dark_logo.png'));
    displayNotification(darkModeEnabled ? t('darkModeTurnedOff') : t('darkModeTurnedOn'), t('notifications'));
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    const notificationStatus = notificationsEnabled ? t('off') : t('on');
    displayNotification(t('notificationsStatus', { notificationStatus }), t('notifications'));
  };

  const changeLanguage = language => {
    i18next.changeLanguage(language);
    setSelectedLanguage(language); // Update selected language state
  };

  const displayNotification = (message, title) => {
    if (notificationsEnabled) {
      Alert.alert(title, message);
    }
  };

  const buttons = [
    { icon: 'leaf', color: '#4CAF50', labelKey: 'liveFieldStatus', screen: 'https://thingspeak.com/channels/2324388', screenName: t('liveFieldStatus') },
    { icon: 'bug', color: '#FF5733', labelKey: 'detectCropDiseases', screen: 'CropDiseaseDetection', screenName: t('detectCropDiseases') },
    { icon: 'calculator', color: '#FFA000', labelKey: 'fertilizerCalculator', screen: 'Fertilizer', screenName: t('fertilizerCalculator') },
    { icon: 'calculator', color: '#8BC34A', labelKey: 'pesticideCalculator', screen: 'Pesticides', screenName: t('pesticideCalculator') },
    { icon: 'cloud-sun-rain', color: '#2196F3', labelKey: 'todaysWeather', screen: 'Weather', screenName:t('todaysWeather') },
    { icon: 'handshake', color: '#FFC107', labelKey: 'postItems', screen: 'PostForm', screenName: t('postItems') },
    { icon: 'shopping-cart', color: '#E64A19', labelKey: 'buyRent', screen: 'DisplayProducts', screenName: t('buyRent') },
    { icon: 'calendar-alt', color: '#2196F3', labelKey: 'agriCalendar', screen: 'Calender', screenName: t('agriCalendar') },
  ];

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkContainer]}>
      <StatusBar backgroundColor="#4CAF50" />
      <Image
        source={darkModeEnabled ? darkLogoSource : logoSource}
        style={darkModeEnabled ? styles.darkLogo : styles.logo}
      />
      <TouchableOpacity style={styles.settingsButton} onPress={() => setShowSettings(true)}>
        <FontAwesome5 name="cog" size={24} color={darkModeEnabled ? '#fff' : 'black'} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, darkModeEnabled && styles.darkTitle]}>{t('welcome')}</Text>
        <Text style={[styles.description, darkModeEnabled && styles.darkDescription]}>{t('description')}</Text>
        <View style={styles.buttonContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                { backgroundColor: button.color },
                (index === 0 || index === 4) && flickerBorderColor ? styles.flicker : null,
              ]}
              onPress={() => navigateTo(button.screen, button.screenName)}
            >
              <FontAwesome5 name={button.icon} size={30} color="black" />
              <Text style={[styles.buttonLabel, darkModeEnabled && styles.darkButtonLabel]}>{t(button.labelKey)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.chatButton} onPress={() => navigateTo('ChatBot', 'Chat Bot')}>
        <FontAwesome5 name="comment" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingRight: showSettings ? 240 : 0 }}>
        <Modal
          isVisible={showSettings}
          onBackdropPress={() => setShowSettings(false)}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          backdropOpacity={0.7}
          backdropTransitionOutTiming={0}
          backdropTransitionInTiming={0}
          style={styles.modal}
        >
          <View style={[
            styles.settingsSlider,
            { backgroundColor: darkModeEnabled ? '#444' : '#FAF3E0' } // Change the background color conditionally
          ]}>
            <Text style={[styles.sliderTitle, darkModeEnabled && styles.darkTitle]}>{t('settings')}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowSettings(false)}>
              <FontAwesome5 name="times" size={24} color={darkModeEnabled ? '#fff' : 'black'} />
            </TouchableOpacity>
            <DarkModeToggle
              darkModeEnabled={darkModeEnabled}
              onDarkModeToggle={toggleDarkMode}
              darkModeLabel={t('darkMode')}
            />
            <NotificationSettings
              notificationsEnabled={notificationsEnabled}
              onNotificationToggle={toggleNotifications}
              notificationLabel={t('notifications')}
            />

            <View style={styles.languagePickerContainer}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) => changeLanguage(itemValue)}
                style={styles.languagePicker}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="عربي" value="ar" />
                <Picker.Item label="Deutsch" value="de" />
                <Picker.Item label="Español " value="es" />
                <Picker.Item label="Italiano" value="it" />
                <Picker.Item label="Français" value="fr" />
                <Picker.Item label="日本語" value="ja" />
                <Picker.Item label="한국어" value="ko" />
                <Picker.Item label="简体中文" value="zn_CN" />
                <Picker.Item label="हिंदी" value="hi" />
                <Picker.Item label="தமிழ்" value="ta" />
                <Picker.Item label="తెలుగు" value="te" />
                <Picker.Item label="বাঙালি" value="be" />
                <Picker.Item label="മലയാളം" value="ml" />
                <Picker.Item label="ಕನ್ನಡ" value="kn" />
              </Picker>
            </View>
            <TouchableOpacity style={[styles.sliderItem, styles.signOutButton]} onPress={signOut}>
              <FontAwesome5 name="sign-out-alt" size={20} color={darkModeEnabled ? '#fff' : 'black'} />
              <Text style={[styles.signOutText, darkModeEnabled && styles.darkTitle]}>{t('signOut')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    padding: 0,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 175,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  darkLogo: {
    width: '100%',
    height: 200, // Increase the height for larger logo in dark mode
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    color: '#4CAF50',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    width: Dimensions.get('window').width / 2 - 30,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flicker: {
    borderWidth: 2,
    borderColor: 'black',
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  settingsSlider: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80%',
    height: '100%',
    padding: 20,
    zIndex: 1,
  },
  modal: {
    margin: 0,
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  sliderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold', // Make the text bold
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  darkTitle: {
    color: '#fff',
  },
  darkDescription: {
    color: '#bbb',
  },
  darkButton: {
    backgroundColor: '#666',
    borderColor: '#fff',
  },
  darkButtonText: {
    color: '#fff',
  },
  darkIcon: {
    color: '#fff',
  },
  buttonLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  darkButtonLabel: {
    textShadowColor: 'black', // Black color for text shadow
    textShadowOffset: { width: -1, height: 1 }, // Offset to create the border effect
    textShadowRadius: 10, // Radius to control the thickness of the border
    color: 'white'
  },
  languagePickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    marginBottom:15
  },
  languagePicker: {
    width: '100%',
  },
});

export default HomeScreen;
