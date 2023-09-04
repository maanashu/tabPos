import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { ms, vs } from 'react-native-size-matters';

export function ButtonIcon({ title, icon, style, textStyle, iconStyle, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Image source={icon} resizeMode="contain" style={[styles.iconSize, iconStyle]} />
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: ms(30),
    borderWidth: 1,
    height: vs(50),
    borderRadius: ms(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.black,
    fontSize: ms(15),
    paddingHorizontal: ms(10),
  },
  iconSize: { height: ms(25), width: ms(25) },
});
