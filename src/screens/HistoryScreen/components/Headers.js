import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Headers = ({navigation, center}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{center}</Text>
    </View>
  );
};

export default React.memo(Headers);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 44,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#cccc',
    borderBottomWidth: 1,
  },
  button: {
    position: 'absolute',
    left: 16,
  },
  back: {
    fontSize: 16,
    fontWeight: '500',
  },

  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
