import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen/MapScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';

const Stack = createNativeStackNavigator();

const RouterContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
          contentStyle: {backgroundColor: 'transparent'},
        }}>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouterContainer;
