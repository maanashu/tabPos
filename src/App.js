import React, { useEffect,useCallback } from 'react';
import { hide } from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { RootNavigator } from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

enableScreens();


export function App() {
  useEffect(() => {
   return async () => await AsyncStorage.removeItem('acceptOrder');
  }, []);
  // useEffect(() => {
  //   Orientation.lockToLandscape();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={hide} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
