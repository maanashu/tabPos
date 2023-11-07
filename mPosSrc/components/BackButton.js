import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts } from '@/theme';

import { Image } from 'react-native';
import { Images } from '@mPOS/assets';

const BackButton = ({ style, title, titleStyle, onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={Images.leftBack} style={styles.backIcon} />
      <Text style={[styles.backTitle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: ms(12),
    // left: ms(12),
    backgroundColor: COLORS.washGrey,
    padding: ms(5),
    // paddingHorizontal: ms(10),
    borderRadius: ms(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    height: ms(15),
    width: ms(15),
    resizeMode: 'contain',
    marginRight: ms(3),
  },
  backTitle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
  },
});
