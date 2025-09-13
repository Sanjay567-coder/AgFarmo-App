import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Logo from '../../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const WeatherWidget = () => {
  const { height } = useWindowDimensions();
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [originalTemperature, setOriginalTemperature] = useState(0); // Initialize with a default value of 0
  const [agriculturalAdvice, setAgriculturalAdvice] = useState('');
  const navigation = useNavigation();
  const [humidity, setHumidity] = useState(0);
  const {t} = useTranslation();

  useEffect(() => {
    // Request location permissions and fetch location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
      fetchWeatherData(locationData.coords.latitude, locationData.coords.longitude);
    })();
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = '1d66610f9e5ed685f32cb89b8c127e5b';
    const units = temperatureUnit === 'metric' ? 'metric' : 'imperial';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData(data);
      setOriginalTemperature(data.main.temp);
      setHumidity(data.main.humidity); // Set humidity data
      provideAgriculturalAdvice(data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const provideAgriculturalAdvice = (data) => {
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description.toLowerCase();
  
    let agriculturalAdvice = '';
  
    if (temperature > 40) {
      if (condition.includes('clear')) {
        agriculturalAdvice = t('Extreme heat and clear sky. Protect your crops from sunburn and provide extra shade. Ensure proper irrigation.');
      } else if (condition.includes('rain')) {
        agriculturalAdvice = t('Extreme heat but rain expected. Ensure your crops are well-irrigated.');
      } else {
        agriculturalAdvice = t('Extreme heat. Protect your crops from sunburn and provide extra shade. Ensure proper irrigation.');
      }
    } else if (temperature > 35 && temperature <= 40) {
      if (condition.includes('clear')) {
        agriculturalAdvice = t('Very hot weather and clear sky. Ensure your crops are well-irrigated and protected from direct sunlight.');
      } else if (condition.includes('rain')) {
        agriculturalAdvice = t('Very hot weather with rain expected. Your crops are getting watered naturally.');
      } else {
        agriculturalAdvice = t('Very hot weather. Ensure your crops are well-irrigated and protected from direct sunlight.');
      }
    } else if (temperature > 30 && temperature <= 35) {
      if (condition.includes('clear')) {
        agriculturalAdvice = t('Hot day and clear sky. Keep an eye on soil moisture and provide shade if needed.');
      } else if (condition.includes('cloud')) {
        agriculturalAdvice = t('Hot day with partly cloudy conditions. Monitor soil moisture levels.');
      } else {
        agriculturalAdvice = t('Hot day. Keep an eye on soil moisture and provide shade if needed.');
      }
    } else if (temperature > 25 && temperature <= 30) {
      if (condition.includes('rain')) {
        agriculturalAdvice = t('Warm weather with rain. Your crops are getting watered naturally.');
      } else {
        agriculturalAdvice = t('Warm weather. Standard care for your crops.');
      }
    } else if (temperature > 20 && temperature <= 25) {
      if (condition.includes('cloud')) {
        agriculturalAdvice = t('Mild temperature with partly cloudy conditions. Your crops should be doing well.');
      } else {
        agriculturalAdvice = t('Mild temperature. Your crops should be doing well.');
      }
    } else if (temperature > 15 && temperature <= 20) {
      if (condition.includes('rain')) {
        agriculturalAdvice = t('Cool day with rain. Your crops are getting watered naturally.');
      } else {
        agriculturalAdvice = t('Cool day. Check soil moisture levels, and protect sensitive crops from frost.');
      }
    } else if (temperature <= 15) {
      if (condition.includes('snow')) {
        agriculturalAdvice = t('Cold weather with snow. Protect your crops from frost and provide extra insulation.');
      } else {
        agriculturalAdvice = t('Cold weather. Protect your crops from frost and provide extra insulation.');
      }
    } else {
      agriculturalAdvice = t('Standard agricultural advice for the current conditions.');
    }
  
    // Add humidity-based advice
    if (humidity < 10) {
      agriculturalAdvice  += t('Very low humidity levels. Maintain consistent irrigation and use mulching to retain moisture.');
    } else if (humidity >= 10 && humidity < 30) {
      agriculturalAdvice  += t('Low humidity levels. Ensure proper irrigation to maintain soil moisture.');
    } else if (humidity >= 30 && humidity < 60) {
      agriculturalAdvice  += t('Moderate humidity levels. Monitor soil moisture and adjust irrigation as needed.');
    } else if (humidity >= 60 && humidity < 80) {
      agriculturalAdvice  += t('Good humidity levels for most crops. Ensure proper drainage to prevent waterlogging.');
    } else {
      agriculturalAdvice  += t('High humidity levels. Be cautious of fungal diseases, ensure good drainage, and provide proper aeration.');
    }
  
    setAgriculturalAdvice(agriculturalAdvice);
  };
  

  const handleUnitChange = (unit) => {
    setTemperatureUnit(unit);
    if (originalTemperature !== null) {
      let updatedTemperature = originalTemperature;

      if (unit === 'imperial') {
        updatedTemperature = (updatedTemperature * 9 / 5) + 32; // Convert to Fahrenheit
      } else {
        updatedTemperature = originalTemperature; // Convert to Celsius
      }

      setWeatherData((prevData) => ({
        ...prevData,
        main: {
          ...prevData.main,
          temp: updatedTemperature,
        },
      }));
    }
  };

  const getWeatherStyles = () => {
    if (weatherData) {
      const condition = weatherData.weather[0].description.toLowerCase();

      let weatherStyles = {
        container: styles.container,
        locationText: styles.locationText,
        temperatureText: styles.temperatureText,
        conditionText: styles.conditionText,
        adviceText: styles.adviceText,
      };

      // Customize styles based on weather conditions
      if (condition.includes('clear')) {
        weatherStyles = {
          ...weatherStyles,
          container: styles.containerClear,
          locationText: styles.locationTextClear,
          temperatureText: styles.temperatureTextClear,
          conditionText: styles.conditionTextClear,
          adviceText: styles.adviceTextClear,
        };
      } else if (condition.includes('rain')) {
        weatherStyles = {
          ...weatherStyles,
          container: styles.containerRain,
          locationText: styles.locationTextRain,
          temperatureText: styles.temperatureTextRain,
          conditionText: styles.conditionTextRain,
          adviceText: styles.adviceTextRain,
        };
      } else if (condition.includes('cloud')) {
        weatherStyles = {
          ...weatherStyles,
          container: styles.containerCloudy,
          locationText: styles.locationTextCloudy,
          temperatureText: styles.temperatureTextCloudy,
          conditionText: styles.conditionTextCloudy,
          adviceText: styles.adviceTextCloudy,
        };
      }
      else if (condition.includes('clouds')) {
        weatherStyles = {
          ...weatherStyles,
          container: styles.containerCloudy,
          locationText: styles.locationTextCloudy,
          temperatureText: styles.temperatureTextCloudy,
          conditionText: styles.conditionTextCloudy,
          adviceText: styles.adviceTextCloudy,
        };
      }

      return weatherStyles;
    }

    // Default styles if no weather data is available
    return {
      container: styles.container,
      locationText: styles.locationText,
      temperatureText: styles.temperatureText,
      conditionText: styles.conditionText,
      adviceText: styles.adviceText,
    };
  };

  const weatherStyles = getWeatherStyles();
  return (
    <ScrollView style={styles.container}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={33} color="black" />
      </TouchableOpacity>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>{t('Weather')}</Text>
      </View>
      <View style={styles.unitContainer}>
        <Text style={styles.unitLabel}>{t('Temperature Unit')}</Text>
        <Picker
          selectedValue={temperatureUnit}
          onValueChange={(itemValue) => handleUnitChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={t('Celsius (°C)')} value="metric" />
          <Picker.Item label={t('Fahrenheit (°F)')} value="imperial" />
        </Picker>
      </View>
  
      {weatherData && (
        <View>
          <Text style={[weatherStyles.locationText, { fontSize: 17, marginBottom: 10 }]}>
            {t('Location')} {weatherData.name}, {weatherData.sys.country}
          </Text>
          <Text style={[weatherStyles.temperatureText, { fontSize: 17, marginBottom: 8 }]}>
            {t('Temperature')} <Text style={{fontWeight:'900'}}>{weatherData.main.temp.toFixed(2)}&deg;
            {temperatureUnit === 'metric' ? 'C' : 'F'}</Text>
          </Text>
          <Text style={[styles.locationText, { fontSize: 17, marginBottom: 8 }]}>
          {t('Humidity')} <Text style={styles.highlightedText}>{humidity}%</Text>
        </Text>
          <Text style={styles.conditionText}>
            {t('Condition')} {weatherData.weather[0].description}
          </Text>
        </View>
      )}
  
      {/* Display Agricultural Advice */}
      <View style={styles.adviceContainer}>
        <Text style={styles.adviceHeading}>{t('Agricultural Advice')}</Text>
        <Text style={[weatherStyles.adviceText, {color:'black'}]}>{agriculturalAdvice}</Text>
      </View>
    </ScrollView>
  );
      }  
const styles = StyleSheet.create({
  // Define additional styles for different weather conditions
  containerClear: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eff0ff', // Light blue background color for clear sky
  },
  containerRain: {
    flex: 1,
    padding: 16,
    backgroundColor: '#c3c3c3', // Light gray background color for rainy weather
  },
  containerCloudy: {
    flex: 1,
    padding: 16,
    backgroundColor: '#d9d9d9', // Light gray background color for cloudy sky
  },
  conditionText: {
    fontSize: 18,
    color: 'royalblue',
    fontStyle: 'italic', // Apply italic style
    textTransform: 'capitalize', // Capitalize the first letter of each word
    fontWeight:'bold'
  },
  // Define additional styles for text based on weather conditions
  locationTextClear: {
    color: 'blue', // Blue text for clear sky
  },
  temperatureTextClear: {
    color: 'red', // Red text for clear sky
    fontWeight:'400'
  },
  conditionTextClear: {
    color: '#333', // Green text for clear sky
  },
  locationTextRain: {
    color: 'black', // Gray text for rainy weather
  },
  temperatureTextRain: {
    color: 'blue', // Blue text for rainy weather
    fontWeight:'400'
  },
  conditionTextRain: {
    color: '#333', // Purple text for rainy weather
  },
  locationTextCloudy: {
    color: 'black', // Black text for cloudy sky
  },
  temperatureTextCloudy: {
    color: 'darkorange', // Gray text for cloudy sky
    fontWeight:'400'
  },
  conditionTextCloudy: {
    color: '#333', // Orange text for cloudy sky
  },
  adviceContainer: {
    marginBottom: 16,
    marginTop: 20,
  },
  adviceHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textDecorationLine: 'underline',
    color: 'green',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 5,
    zIndex: 1,
  },
  picker: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  unitLabel: {
    fontSize: 19,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'green',
  },
  adviceTextClear: {
    fontSize: 18,
    color: 'green', // Green text for clear sky
    fontWeight: 'bold',
  },
  adviceTextRain: {
    fontSize: 18,
    color: 'blue', // Blue text for rainy weather
    fontWeight: 'bold',
  },
  adviceTextCloudy: {
    fontSize: 18,
    color: 'gray', // Gray text for cloudy sky
    fontWeight: 'bold',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAF3E0',
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green',
  },
  adviceContainer: {
    marginBottom: 16,
    marginTop: 20,
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
    padding: 10,
    borderRadius: 8,
    borderColor: 'green', // Border color for advice container
    borderWidth: 1, // Border width for advice container
    shadowColor: 'green', // Shadow color
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  headingContainer: {
    backgroundColor: 'darkgreen',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  highlightedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  adviceHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textDecorationLine: 'underline',
    color: 'green',
  },
  adviceText: {
    fontSize: 18,
    color: 'green',
  },
  picker: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  unitLabel: {
    fontSize: 19,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'green',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    borderWidth: 2, // Border around the logo
    borderColor: 'green', // Border color for the logo
    borderRadius: 10, // Border radius for the logo
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
});

export default WeatherWidget;
