import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ms } from 'react-native-size-matters';

import { strings } from '@mPOS/localization';
import { goBack } from '@mPOS/navigation/NavigationRef';
import { COLORS, Fonts, SF, ShadowStyles } from '@/theme';

const Header = () => (
  <View style={styles.headerViewStyle}>
    <TouchableOpacity onPress={() => goBack()} style={styles.backButtonStyle}>
      <Text style={styles.buttonTextStyle}>{strings.profile.header}</Text>
    </TouchableOpacity>
  </View>
);

export default memo(Header);

const styles = StyleSheet.create({
  headerViewStyle: {
    height: ms(60),
    ...ShadowStyles.shadow,
    justifyContent: 'center',
    paddingHorizontal: ms(12),
    backgroundColor: COLORS.white,
  },
  backButtonStyle: {
    width: ms(70),
    height: ms(28),
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: COLORS.inputBorder,
  },
  buttonTextStyle: {
    fontSize: SF(12),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
});
