import {View, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import styles from './HistoryScreenStyles';
import Headers from './components/Headers';
import Card from './components/Card';

const HistoryScreen = ({navigation}) => {
  const data = [
    {url: '1', id: '1'},
    {url: '1', id: '2'},
    {url: '1', id: '3'},
    {url: '1', id: '4'},
    {url: '1', id: '5'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Headers navigation={navigation} />
      <View style={styles.form}>
        <FlatList
          style={styles.form}
          data={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Card {...item} />}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
