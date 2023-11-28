import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { Fonts } from '@/assets';
import { COLORS } from '@/theme';
import { Image } from 'react-native';
import { leftBack } from '@/assets';
import { Images } from '@/assets/new_icon';

const BackButton = ({ style, title, titleStyle, onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={Images.arrowLeftUp} style={styles.backIcon} />
      <Text style={[styles.backTitle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: ms(12),
    left: ms(12),
    backgroundColor: COLORS.washGrey,
    padding: ms(5),
    paddingHorizontal: ms(10),
    borderRadius: ms(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    height: ms(12),
    width: ms(12),
    resizeMode: 'contain',
    marginRight: ms(3),
    tintColor: COLORS.navy_blue,
  },
  backTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(9),
  },
});
