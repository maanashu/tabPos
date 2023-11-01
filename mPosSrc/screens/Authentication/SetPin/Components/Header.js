import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { goBack } from '@mPOS/navigation/NavigationRef';
import { COLORS, Fonts, SF, SH, ShadowStyles, SW } from '@/theme';

const Header = ({ clearInput }) => {
  return (
    <View style={styles.headerMainView}>
      <TouchableOpacity onPress={() => goBack()} activeOpacity={1} style={styles.mainHeaderView}>
        <Image source={Images.backArrow} style={styles.leftIconStyle} />
        <Text style={styles.headerTextStyle}>{strings.setPin.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={clearInput}>
        <Text style={styles.cancelTextStyle}>{strings.setPin.subTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerMainView: {
    height: SH(55),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...ShadowStyles.shadow1,
    justifyContent: 'space-between',
  },
  leftIconStyle: {
    width: SW(20),
    height: SW(20),
    tintColor: COLORS.black,
    resizeMode: 'contain',
  },
  headerTextStyle: {
    fontSize: SF(14),
    paddingLeft: 4,
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  mainHeaderView: {
    paddingLeft: SW(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelTextStyle: {
    fontSize: SF(12),
    color: COLORS.darkBlue,
    fontFamily: Fonts.Regular,
    paddingRight: SW(15),
  },
});
