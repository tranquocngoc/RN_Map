import firestore from '@react-native-firebase/firestore';

// useEffect(() => {
//   const subscriber = firestore()
//     .collection('Users')
//     .doc(userId)
//     .onSnapshot(documentSnapshot => {
//       console.log('User data: ', documentSnapshot.data());
//     });

//   // Stop listening for updates when no longer required
//   return () => subscriber();
// }, [userId]);

// const usersCollection = firestore()
//   .collection('history')
//   .doc('qmAJHYrIMyZjx8rRWpgc')
//   .onSnapshot(documentSnapshot => {
//     console.log('User data: ', documentSnapshot.data());
//   });
// console.log('usersCollection', usersCollection);
