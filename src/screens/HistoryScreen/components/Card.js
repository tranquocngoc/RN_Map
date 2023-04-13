import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import moment from 'moment';

const Card = ({item, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPress(item);
        }}
        style={styles.section}>
        <View style={styles.image}>
          <Image style={styles.avatar} source={{uri: item.url}} />
        </View>
        <View style={styles.formText}>
          <Text numberOfLines={1}>
            Date:
            {moment(item.createDate).format('HH:mm DD/MM/YYYY')}
          </Text>
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
  titleText: {fontWeight: 'bold', fontSize: 14},
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
