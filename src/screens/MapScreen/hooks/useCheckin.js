import firestore from '@react-native-firebase/firestore';

import {useCallback} from 'react';

export const useCheckIn = collection => {
  const add = useCallback(
    item => {
      firestore()
        .collection(collection)
        .add({...item, createDate: Date.now()})
        .then(() => {
          console.log('history added!');
        });
    },
    [collection],
  );

  return [add];
};
