import {View, Text} from 'react-native';
import React from 'react';
import styles from './MapScreenStyles';
import MapView from 'react-native-maps';
const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
};

export default MapScreen;
