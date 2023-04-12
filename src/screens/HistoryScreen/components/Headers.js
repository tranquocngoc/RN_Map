import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Headers = ({navigation}) => {
  console.log('render Header');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Center</Text>
    </View>
  );
};

export default React.memo(Headers);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 44,
    width: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    left: 16,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
