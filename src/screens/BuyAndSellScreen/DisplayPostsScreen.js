import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


const DisplayScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  
  const menuData = [
    { title: t('title2'), icon: 'leaf', color: 'green' },
    { title: t('title3'), icon: 'truck', color: 'darkorange' },
    { title: t('rentEquipment'), icon: 'wrench', color: 'purple' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('title5')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {menuData.map((item) => (
          <View style={[styles.button, { backgroundColor: item.color }]} key={item.title}>
            <TouchableOpacity
              onPress={() => {
                if (item.title === t('title2')) {
                  navigation.navigate('BuyCrops');
                } else if (item.title === t('title3')) {
                  navigation.navigate('BuyEquipment');
                } else if (item.title === t('rentEquipment')) {
                  navigation.navigate('RentEquipment');
                }
              }}
            >
              <View style={styles.iconContainer}>
                <Icon name={item.icon} size={50} color="white"/>
              </View>
              <Text style={styles.buttonText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DisplayScreen;
