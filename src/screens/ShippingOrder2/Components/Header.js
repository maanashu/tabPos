import React, { memo } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { ms } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { Fonts, backArrow2 } from '@/assets';

import styles from '../ShippingOrder2.styles';

const Header = ({ viewAllOrders, setViewAllOrders }) => (
  <>
    {viewAllOrders ? (
      <TouchableOpacity onPress={() => setViewAllOrders(false)} style={styles.backView}>
        <Image source={backArrow2} style={styles.backImageStyle} />
        <Text style={style.currentStatusText}>{strings.deliveryOrders.back}</Text>
      </TouchableOpacity>
    ) : null}
  </>
);

export default memo(Header);

const style = StyleSheet.create({
  currentStatusText: {
    fontSize: ms(8),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
});
