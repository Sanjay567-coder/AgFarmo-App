import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgetPasswordScreen/ForgetPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen/Home';
import FertilizerCalculatorScreen from '../screens/FertlizerCalculatorScreen/FertilizerCalculationScreen';
import WeatherScreen from '../screens/WeatherScreen/WeatherScreen';
import MainScreen from '../screens/CalenderScreen/Main';
import ChatBotScreen from '../screens/ChatBotScreen/ChatBotScreen'
import RentEquipmentScreen from '../screens/BuyAndSellScreen/RentEquipmentScreen';
import CombinedForm from '../screens/BuyAndSellScreen/CombinedForm';
import BuyCropsScreen from '../screens/BuyAndSellScreen/BuyCropsScreen';
import BuyEquipmentScreen from '../screens/BuyAndSellScreen/BuyEquipmentScreen';
import DisplayPosts from '../screens/BuyAndSellScreen/DisplayPostsScreen'; 
import PesticidesCalculatorScreen from '../screens/PesticidesCalculatorScreen.js/PesticidesCalculatorScreen';
import CropDiseaseDetectionScreen from '../screens/CropDiseaseDetectionScreen/CropDiseaseDetectionScreen';
import {Auth, Hub} from 'aws-amplify';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        )}
        <Stack.Screen name="Fertilizer" component={FertilizerCalculatorScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Calender" component={MainScreen} />
        <Stack.Screen name="ChatBot" component={ChatBotScreen} />
        <Stack.Screen name="PostForm" component={CombinedForm} />
        <Stack.Screen name="DisplayProducts" component={DisplayPosts} />
        <Stack.Screen name="BuyCrops" component={BuyCropsScreen} />
        <Stack.Screen name="BuyEquipment" component={BuyEquipmentScreen} />
        <Stack.Screen name="RentEquipment" component={RentEquipmentScreen} />
        <Stack.Screen name="Pesticides" component={PesticidesCalculatorScreen} />
        <Stack.Screen name="CropDiseaseDetection" component={CropDiseaseDetectionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
