import React, { memo } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useDispatch } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, ShadowStyles } from '@/theme';
import { logoutFunction } from '@/actions/AuthActions';

const Header = () => {
  const dispatch = useDispatch();

  const onPressLogoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => dispatch(logoutFunction()),
      },
    ]);
  };

  return (
    <View style={styles.headerViewStyle}>
      <TouchableOpacity onPress={onPressLogoutHandler} style={styles.logoutButtonStyle}>
        <Text style={styles.buttonTextStyle}>{strings.login.logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  headerViewStyle: {
    height: ms(60),
    ...ShadowStyles.shadow,
    justifyContent: 'center',
    paddingHorizontal: ms(12),
    backgroundColor: COLORS.inputBorder,
  },
  logoutButtonStyle: {
    width: ms(70),
    height: ms(28),
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: COLORS.darkGray,
  },
  buttonTextStyle: {
    fontSize: SF(12),
    color: COLORS.white,
    fontFamily: Fonts.Regular,
  },
});
