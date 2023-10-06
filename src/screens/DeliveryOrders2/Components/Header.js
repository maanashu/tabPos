import React, { memo } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { ms } from 'react-native-size-matters';

import { COLORS, SW } from '@/theme';
import { strings } from '@/localization';
import { backArrow2, Fonts } from '@/assets';

const Header = ({ viewAllOrder, setViewAllOrder, setIsBack }) => {
  return (
    <>
      {viewAllOrder && (
        <TouchableOpacity
          onPress={() => {
            setViewAllOrder(false);
            setIsBack(true);
          }}
          style={styles.backView}
        >
          <Image source={backArrow2} style={styles.backImageStyle} />
          <Text style={styles.currentStatusText}>{strings.deliveryOrders.back}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  backView: {
    marginTop: 10,
    marginLeft: 18,
    width: ms(60),
    borderRadius: 5,
    height: ms(25),
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gerySkies,
  },
  backImageStyle: {
    width: SW(8),
    height: SW(8),
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
  currentStatusText: {
    fontSize: ms(8),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
});
