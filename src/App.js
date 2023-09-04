import React, { useEffect, useRef, useState } from 'react';
import { AppState, Image, Platform, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import { hide } from 'react-native-bootsplash';
import RNLockTask from 'react-native-lock-task';
import { enableScreens } from 'react-native-screens';
import NetInfo from '@react-native-community/netinfo';
import Toast, { BaseToast } from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import { persistor, store } from '@/store';
import { RootNavigator } from '@/navigation';
import { COLORS, SF, SH, SW } from './theme';
import { Fonts, toastcross, toastcheck } from '@/assets';
import { configureMessaging, getDeviceToken, requestPermission } from './utils/Notifications';

if (!__DEV__) {
  Platform.OS === 'android' && RNLockTask.startLockTask();
}

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
  const currentState = useRef(AppState.currentState);
  const [state, setState] = useState(currentState.current);

  useEffect(() => {
    requestPermission();
    configureMessaging();
    getDeviceToken();
    return async () => {
      await AsyncStorage.removeItem('acceptOrder');
      unsubscribe();
    };
  }, []);

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
