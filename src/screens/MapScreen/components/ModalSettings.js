import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
import Geolocation from '@react-native-community/geolocation';

const ModalSettings = ({
  modalSettings,
  setModalSettings,
  options,
  setOptions,
  setDistance,
  setMap,
  setMyLocation,
}) => {
  const handlerCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        const _myLocation = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };
        setDistance(_myLocation, options.assignedLocation);
        setMyLocation(_myLocation);
        setMap(options.assignedLocation);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
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
              placeholder={`${options.assignedLocation.latitude}`}
              placeholderTextColor={'black'}
              style={styles.textInput}
              onChangeText={latitude => {
                +latitude &&
                  setOptions({
                    ...options,
                    assignedLocation: {
                      ...options.assignedLocation,
                      latitude: +latitude,
                    },
                  });
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.textStyle}>Longitude:</Text>
            <TextInput
              placeholder={`${options.assignedLocation.longitude}`}
              placeholderTextColor={'black'}
              style={styles.textInput}
              onChangeText={longitude =>
                +longitude &&
                setOptions({
                  ...options,
                  assignedLocation: {
                    ...options.assignedLocation,
                    longitude: +longitude,
                  },
                })
              }
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.textStyle}>Radius:</Text>
            <TextInput
              placeholder={`${options.radius}`}
              placeholderTextColor={'black'}
              style={styles.textInput}
              onChangeText={radius =>
                +radius && setOptions({...options, radius: +radius})
              }
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
