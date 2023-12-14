import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { COLORS, SW } from '@/theme';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { arrowLeftUp, backArrow2, Fonts } from '@/assets';
import { navigate } from '@/navigation/NavigationRef';

const Header = () => (
  <TouchableOpacity onPress={() => navigate(NAVIGATION.dashBoard)} style={styles.backView}>
    <Image source={arrowLeftUp} style={styles.backImageStyle} />
    <Text style={styles.currentStatusText}>{strings.deliveryOrders.back}</Text>
  </TouchableOpacity>
);

export default memo(Header);

const styles = StyleSheet.create({
  backView: {
    marginTop: 10,
    marginLeft: ms(15),
    // width: ms(60),
    height: ms(25),
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  backImageStyle: {
    width: SW(8),
    height: SW(8),
    tintColor: COLORS.navy_blue,
    resizeMode: 'contain',
  },
  currentStatusText: {
    fontSize: ms(8),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(4),
  },
});
