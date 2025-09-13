import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const NotificationSettings = ({ notificationsEnabled, onNotificationToggle, notificationLabel }) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="bell" size={20} color="#000" style={styles.icon} />
      <Text style={styles.label}>{notificationLabel}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onNotificationToggle}
        value={notificationsEnabled}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  icon: {
    marginRight: 10,
    position: 'absolute',
    left: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30, // Adjust the margin to create space between the icon and label
  },
  switch: {
    position: 'absolute',
    right: 0,
  },
});

export default NotificationSettings;
