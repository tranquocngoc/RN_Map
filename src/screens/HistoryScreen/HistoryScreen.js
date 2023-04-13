import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './HistoryScreenStyles';
import Headers from './components/Headers';
import Card from './components/Card';
import firestore from '@react-native-firebase/firestore';
import ImageDetail from './components/ImageDetail';

const HistoryScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [enableModal, setEnableModal] = useState(false);
  const [selectCard, setSelectCard] = useState({});

  useEffect(() => {
    const subscriber = firestore()
      .collection('History')
      .onSnapshot(querySnapshot => {
        const history = [];
        querySnapshot.forEach(documentSnapshot => {
          history.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        const arrangeHistory = history.sort(
          (firstItem, secondItem) =>
            secondItem.createDate - firstItem.createDate,
        );
        setData(arrangeHistory);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const showEnableModal = item => {
    setSelectCard(item);
    setEnableModal(true);
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Headers navigation={navigation} center={'History'} />
      <ImageDetail
        enableModal={enableModal}
        item={selectCard}
        setEnableModal={setEnableModal}
      />
      <View style={styles.form}>
        <FlatList
          style={styles.form}
          data={data}
          keyExtractor={(item, index) => item.key}
          renderItem={({item}) => (
            <Card item={item} onPress={showEnableModal} />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
