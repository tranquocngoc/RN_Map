import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';

const Card = ({item}) => {
  // console.log('item', item);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}} style={styles.section}>
        <View style={styles.image}>
          <Image style={styles.avatar} source={{uri: item.url}} />
        </View>
        <View style={styles.formText}>
          <Text style={styles.titleText}>My Location:</Text>
          <Text>latitude: {item.location.latitude}</Text>
          <Text>longitude: {item.location.longitude}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  container: {justifyContent: 'center'},
  titleText: {fontWeight: 'bold', fontSize: 16},
  formText: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  avatar: {width: 150, height: 150, margin: 16},
  image: {
    flex: 1,
  },
  section: {
    flex: 1,
    margin: 4,
    borderRadius: 10,
  },
});
