import React, { useEffect, useCallback, useRef, useState } from 'react';
import { AppState, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { hide } from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { RootNavigator } from '@/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Fonts, success, error, toastcross, toastcheck } from '@/assets';
import { COLORS, SF, SH, SW } from './theme';
import NetInfo from '@react-native-community/netinfo';
import { configureMessaging, getDeviceToken, requestPermission } from './utils/Notifications';

import RNLockTask from 'react-native-lock-task';
Platform.OS === 'android' && RNLockTask.startLockTask();

import SystemNavigationBar from 'react-native-system-navigation-bar';
SystemNavigationBar.stickyImmersive();
enableScreens();

const toastConfig = {
  success_toast: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: COLORS.green, zIndex: 999 }}
      contentContainerstyle={{ paddingHorizontal: SW(15) }}
      renderTrailingIcon={() => <Image source={toastcheck} style={styles.tralingicon} />}
      text2Style={{
        fontSize: SF(14),
        color: COLORS.green,
        fontFamily: Fonts.SemiBold,
      }}
      text1={text1}
      text2={text2}
      trailingIconStyle={{
        height: SH(15),
        aspectRatio: 1,
        marginRight: SW(16),
      }}
      leadingIconStyle={{ height: SH(26), aspectRatio: 1 }}
      onTrailingIconpress={() => Toast.hide()}
      text2NumberOfLines={2}
    />
  ),
  error_toast: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: COLORS.red, zIndex: 999 }}
      contentContainerstyle={{ paddingHorizontal: SW(15) }}
      renderTrailingIcon={() => <Image source={toastcross} style={styles.tralingicon} />}
      text2Style={{
        fontSize: SF(14),
        color: COLORS.red,
        fontFamily: Fonts.SemiBold,
      }}
      text1={text1}
      text2={text2}
      trailingIconStyle={{
        height: SH(15),
        aspectRatio: 1,
        marginRight: SW(16),
      }}
      leadingIconStyle={{ height: SH(26), aspectRatio: 1 }}
      onTrailingIconpress={() => Toast.hide()}
      text2NumberOfLines={2}
    />
  ),
};

const unsubscribe = NetInfo.addEventListener((state) => {
  if (state.isConnected === false) {
    Toast.show({
      text2: 'Go offline',
      position: 'bottom',
      type: 'error_toast',
      visibilityTime: 9000,
    });
  } else if (state.isConnected === true) {
    Toast.show({
      text2: 'Back online',
      position: 'bottom',
      type: 'success_toast',
      visibilityTime: 2500,
    });
  }
});
export function App() {
  useEffect(() => {
    requestPermission();
    configureMessaging();
    getDeviceToken();
    return async () => {
      await AsyncStorage.removeItem('acceptOrder');
      unsubscribe();
    };
  }, []);

  const currentState = useRef(AppState.currentState);
  const [state, setState] = useState(currentState.current);

  useEffect(() => {
    const handleChange = AppState.addEventListener('change', (changedState) => {
      currentState.current = changedState;
      setState(currentState.current);
    });

    return () => {
      handleChange.remove();
    };
  }, []);
  useEffect(() => {
    if (state === 'background') {
    }
  }, [state]);

  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={hide} persistor={persistor}>
        <RootNavigator />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tralingicon: {
    width: SW(20),
    height: SH(20),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
