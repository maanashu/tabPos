import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import Toast, { BaseToast } from 'react-native-toast-message';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { getDeviceToken, requestPermission, configureMessaging } from './utils/Notifications';
import { store } from '@/store';
import { Images } from '@mPOS/assets';
import { RootNavigator } from '@mPOS/navigation';
import { COLORS, Fonts, SF, SW } from '@/theme';

const toastConfig = {
  success_toast: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      text1={text1}
      text2={text2}
      text2NumberOfLines={2}
      text2Style={styles.successTextStyle}
      onTrailingIconpress={() => Toast.hide()}
      style={{ borderLeftColor: COLORS.green }}
      contentContainerstyle={{ paddingHorizontal: SW(15) }}
      renderTrailingIcon={() => <Image source={Images.success} style={styles.trailingIconStyle} />}
    />
  ),

  error_toast: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      text1={text1}
      text2={text2}
      text2NumberOfLines={2}
      text2Style={styles.errorTextStyles}
      style={{ borderLeftColor: COLORS.red }}
      onTrailingIconpress={() => Toast.hide()}
      contentContainerstyle={{ paddingHorizontal: SW(15) }}
      renderTrailingIcon={() => <Image source={Images.error} style={styles.trailingIconStyle} />}
    />
  ),
};

export const App = () => {
  useEffect(() => {
    requestPermission();
    configureMessaging();
    getDeviceToken();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <RootNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trailingIconStyle: {
    right: 10,
    width: SW(15),
    height: SW(15),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  successTextStyle: {
    fontSize: SF(14),
    color: COLORS.green,
    fontFamily: Fonts.SemiBold,
  },
  errorTextStyles: {
    fontSize: SF(14),
    color: COLORS.red,
    fontFamily: Fonts.SemiBold,
  },
});
