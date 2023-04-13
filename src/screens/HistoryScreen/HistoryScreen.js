import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './HistoryScreenStyles';
import Headers from './components/Headers';
import Card from './components/Card';
import firestore from '@react-native-firebase/firestore';

const HistoryScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('history')
      .onSnapshot(querySnapshot => {
        const history = [];
        querySnapshot.forEach(documentSnapshot => {
          history.push({
            ...documentSnapshot.data(),
            location: {
              latitude: documentSnapshot.get('location')._latitude,
              longitude: documentSnapshot.get('location')._longitude,
            },
            key: documentSnapshot.id,
          });
        });
        setData(history);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  console.log('data', data);

  if (loading) {
    return <ActivityIndicator />;
  }

  // const data = [
  //   {url: '1', id: '1'},
  //   {url: '1', id: '2'},
  //   {url: '1', id: '3'},
  //   {url: '1', id: '4'},
  //   {url: '1', id: '5'},
  // ];

  return (
    <SafeAreaView style={styles.container}>
      <Headers navigation={navigation} />
      <View style={styles.form}>
        <FlatList
          style={styles.form}
          data={data}
          keyExtractor={(item, index) => item.key}
          renderItem={item => <Card {...item} />}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
