import {View, Text, Modal, Pressable, StyleSheet, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React from 'react';
import {CAMERA_OPTION, LIBRARY_OPTION} from '../../../constant';

const ModalCheckIn = ({modalCheckIn, setModalCheckIn, image, setImage}) => {
  const handelCamera = async () => {
    Alert.alert(
      'Select_A_Photo',
      '',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(CAMERA_OPTION, res => {
              if (res.didCancel) {
                console.log('User cancelled image picker');
              } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
              } else {
                setImage(res);
              }
            });
          },
        },
        {
          text: 'Library',
          onPress: () => {
            launchImageLibrary(LIBRARY_OPTION, res => {
              if (res.didCancel) {
                console.log('User cancelled image picker');
              } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
              } else {
                setImage(res);
              }
            });
          },
        },
        {text: 'Close'},
      ],
      {cancelable: false},
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalCheckIn}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalCheckIn(!modalCheckIn)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handelCamera}>
            <Text style={styles.textStyle}>CAMERA</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ModalCheckIn);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
