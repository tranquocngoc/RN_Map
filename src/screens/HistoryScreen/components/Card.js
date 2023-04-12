import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';

const Card = ({item}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}} style={styles.section}>
        <View style={styles.image}>
          <Image
            style={styles.avatar}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
        </View>
        <View style={styles.formText}>
          <Text style={styles.titleText}>My Location:</Text>
          <Text>latitude: {111}</Text>
          <Text>longitude: {444}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  titleText: {fontWeight: 'bold', fontSize: 16},
  formText: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  avatar: {width: 150, height: 150, margin: 8},
  image: {
    flex: 1,
  },
  section: {
    flex: 1,
    margin: 4,
    borderRadius: 10,
  },
});
