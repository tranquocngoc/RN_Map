import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
const {width, height} = Dimensions.get('window');
import Geolocation from '@react-native-community/geolocation';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

export const getRegionFromLatLongDistance = (lat, lon, radius = 100) => {
  const distance = radius / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const deltaTime = Date.now() / 10000000000000000000;
  const latitudeDelta = deltaTime + distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(parseFloat(lat)),
      Math.cos(angularDistance) -
        Math.sin(parseFloat(lat)) * Math.sin(parseFloat(lat)),
    ),
  );
  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  };
};

const ModalSettings = ({
  modalSettings,
  setModalSettings,
  assignedLocation,
  setAssignedLocation,
  setDistance,
  setMap,
  setMyLocation,
  radius,
  setRadius,
}) => {
  const _radius = useRef(radius);
  const _latitude = useRef(assignedLocation.latitude);
  const _longitude = useRef(assignedLocation.longitude);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        const _myLocation = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };
        const _assignedLocation = {
          latitude: parseFloat(_latitude.current),
          longitude: parseFloat(_longitude.current),
        };
        setAssignedLocation(_assignedLocation);
        setRadius(parseFloat(_radius.current));
        setDistance(_myLocation, _assignedLocation);
        setMyLocation(_myLocation);
        setMap(
          getRegionFromLatLongDistance(_latitude.current, _longitude.current),
        );
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
    <Modal animationType="slide" transparent={true} visible={modalSettings}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            onPress={() => {
              setModalSettings(!modalSettings);
              handlerCurrentLocation();
            }}
            style={styles.buttonText}>
            Done
          </Text>
          <View style={styles.formInput}>
            <Text style={styles.textStyle}>Latitude:</Text>
            <TextInput
              placeholder={`${assignedLocation.latitude}`}
              placeholderTextColor={'black'}
              style={styles.textInput}
              onChangeText={latitude => (_latitude.current = latitude)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.textStyle}>Longitude:</Text>
            <TextInput
              placeholder={`${assignedLocation.longitude}`}
              placeholderTextColor={'black'}
              style={styles.textInput}
              onChangeText={longitude => (_longitude.current = longitude)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.textStyle}>Radius:</Text>
            <TextInput
              placeholder={`${radius}`}
              placeholderTextColor={'black'}
              style={styles.textInput}
              onChangeText={R => {
                _radius.current = R;
              }}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ModalSettings);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width - 32,
    height: height / 3.5,
    paddingTop: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    position: 'absolute',
    right: 20,
    top: 20,
    fontWeight: '500',
    fontSize: 16,
    color: '#0070c9',
  },
  textInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginLeft: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
  },
  formInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    width: 80,
  },
});
