import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from './MapScreenStyles';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Icons} from '../../themes';
import {useDistance} from './hooks';
import {MAP, SETTINGS_DEFAULT} from '../../constant';
import ModalCheckIn from './components/ModalCheckIn';
import ModalSettings, {
  getRegionFromLatLongDistance,
} from './components/ModalSettings';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

const MapScreen = ({navigation}) => {
  const [myLocation, setMyLocation] = useState({});
  const [map, setMap] = useState(MAP);
  const [modalCheckIn, setModalCheckIn] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [options, setOptions] = useState(SETTINGS_DEFAULT);
  const [distance, setDistance] = useDistance();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        const _myLocation = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };
        setMyLocation(_myLocation);
        setMap(
          getRegionFromLatLongDistance(
            _myLocation.latitude,
            _myLocation.longitude,
          ),
        );
        setDistance(_myLocation, options.assignedLocation);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
    );
  };

  const handlerCurrentLocation = async () => {
    const statusCheckLocation = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (statusCheckLocation === 'granted') {
      getCurrentLocation();
    } else if (statusCheckLocation === 'denied') {
      const statusRequestLocation = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (statusRequestLocation === 'granted') {
        getCurrentLocation();
      }
    } else {
      openSettings;
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ModalCheckIn
        setModalCheckIn={setModalCheckIn}
        modalCheckIn={modalCheckIn}
        location={myLocation}
      />
      <ModalSettings
        modalSettings={modalSettings}
        options={options}
        setModalSettings={setModalSettings}
        setOptions={setOptions}
        setDistance={setDistance}
        setMap={setMap}
        setMyLocation={setMyLocation}
      />
      <View style={styles.container}>
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          region={map}
          // onRegionChange={setMap}
        >
          {!!myLocation.latitude && (
            <Marker coordinate={myLocation} title="MyLocation" pinColor="red" />
          )}
          <Marker
            coordinate={options.assignedLocation}
            title="Word"
            pinColor="green"
          />
          <Circle
            center={options.assignedLocation}
            radius={options.radius}
            fillColor="rgba(0, 255, 0, 0.3)"
            strokeColor="rgb(240, 240, 240, 1)"
          />
        </MapView>
        <View style={styles.formButton}>
          <Pressable
            style={styles.buttonLocation}
            onPress={handlerCurrentLocation}>
            <Image source={Icons.ic_location_on} style={styles.icon} />
          </Pressable>
          <Pressable
            style={styles.buttonLocation}
            onPress={() => setModalSettings(true)}>
            <Image source={Icons.ic_settings} style={styles.icon} />
          </Pressable>
          <Pressable
            style={styles.buttonLocation}
            onPress={() => {
              navigation.navigate('HistoryScreen');
            }}>
            <Image source={Icons.ic_history} style={styles.icon} />
          </Pressable>
        </View>
      </View>
      <View style={styles.formBottom}>
        <View>
          <View style={styles.formText}>
            <Text style={styles.titleText}>My Location:</Text>
            <Text>latitude: {myLocation.latitude}</Text>
            <Text>longitude: {myLocation.longitude}</Text>
          </View>
          <View style={styles.formText}>
            <Text style={styles.titleText}>Word:</Text>
            <Text>latitude: {options.assignedLocation.latitude}</Text>
            <Text>longitude: {options.assignedLocation.longitude}</Text>
          </View>
          <View style={styles.formText}>
            <Text style={styles.titleText}>Distance: </Text>
            <Text> {distance ?? '?'} m</Text>
          </View>
        </View>
        <View style={styles.buttonBottom}>
          <TouchableOpacity
            style={[
              styles.buttonCheckIn,
              {
                backgroundColor: `${
                  !distance || distance > options.radius
                    ? '#cccc'
                    : 'rgba(0, 255, 0, 0.3)'
                }`,
              },
            ]}
            disabled={!distance || distance > options.radius}
            onPress={() => setModalCheckIn(true)}>
            <Text style={styles.titleText}>Check In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
