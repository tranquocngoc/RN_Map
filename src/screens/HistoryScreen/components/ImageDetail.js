import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

const ImageDetail = ({enableModal, setEnableModal, item}) => {
  const {createDate, location, url} = item || {};
  return (
    <Modal animationType="slide" transparent={true} visible={enableModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text
            onPress={() => setEnableModal(!enableModal)}
            style={styles.modalText}>
            Back
          </Text>
        </View>
        <Image style={styles.image} source={{uri: url}} />
        <View style={styles.formText}>
          <Text numberOfLines={1} style={styles.titleText}>
            Date:
            {moment(createDate).format('HH:mm DD/MM/YYYY')}
          </Text>
          <Text style={styles.noteText}>latitude: {location?.latitude}</Text>
          <Text style={styles.noteText}>longitude: {location?.longitude}</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width,
    height: height,
    alignItems: 'center',
  },
  header: {
    minHeight: 44,
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#cccc',
    borderBottomWidth: 1,
  },
  modalText: {
    color: '#0070c9',
    marginVertical: 24,
    marginHorizontal: 40,
    fontSize: 16,
    fontWeight: '500',
  },
  titleText: {fontWeight: 'bold', fontSize: 16, margin: 4},
  noteText: {
    margin: 4,
    fontSize: 16,
  },
  formText: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  image: {width: width - 32, height: ((width - 32) * 4) / 3},
});
