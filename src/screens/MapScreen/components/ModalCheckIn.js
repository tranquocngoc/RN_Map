import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import {CAMERA_OPTION, LIBRARY_OPTION} from '../../../constant';
import storage from '@react-native-firebase/storage';
import {Icons} from '../../../themes';
import {useCheckIn} from '../hooks';
const {width, height} = Dimensions.get('window');

const ModalCheckIn = ({modalCheckIn, setModalCheckIn, location}) => {
  const [options, setOptions] = useState({
    createDate: new Date(),
    location: location,
    url: '',
  });

  useEffect(() => {
    setOptions(prevOption => ({...prevOption, location}));
  }, [location]);

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
                // console.log('User cancelled image picker');
              } else if (res.error) {
                // console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
              } else {
                const img = {...res.assets[0]};
                uploadsFile(img);
              }
            });
          },
        },
        {
          text: 'Library',
          onPress: () => {
            launchImageLibrary(LIBRARY_OPTION, res => {
              if (res.didCancel) {
                // console.log('User cancelled image picker');
              } else if (res.error) {
                // console.log('ImagePicker Error: ', res.error);
              } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
              } else {
                const img = {...res.assets[0]};
                uploadsFile(img);
              }
            });
          },
        },
        {text: 'Close'},
      ],
      {cancelable: false},
    );
  };

  const uploadsFile = async img => {
    const reference = storage().ref('images/' + img.fileName);
    const pathToFile = img.uri;
    // uploads file
    await reference.putFile(pathToFile);
    // DownloadURL
    const url = await reference.getDownloadURL(pathToFile);
    // console.log('url', url);
    setOptions({...options, url});
  };

  const [add] = useCheckIn('History');

  return (
    <Modal animationType="slide" transparent={true} visible={modalCheckIn}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              onPress={() => setModalCheckIn(!modalCheckIn)}
              style={styles.modalText}>
              Back
            </Text>
            <Text
              onPress={() => {
                add(options);
                setModalCheckIn(!modalCheckIn);
              }}
              style={styles.modalText}>
              Done
            </Text>
          </View>
          <View style={styles.body}>
            {options.url && (
              <Image style={styles.image} source={{uri: options.url}} />
            )}
            <Pressable style={styles.button} onPress={handelCamera}>
              <Image style={styles.icon} source={Icons.ic_camera} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default React.memo(ModalCheckIn);

const styles = StyleSheet.create({
  centeredView: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: width - 32,
    height: height / 2,
    borderRadius: 20,
  },

  header: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 50,
    margin: 8,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#0070c9',
    textAlign: 'center',
    marginVertical: 24,
    marginHorizontal: 40,
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {width: 50, height: 50},
  image: {
    width: width / 1.5,
    height: ((width - 32) * 4) / 5,
    borderRadius: 20,
    backgroundColor: '#cccc',
  },
});
