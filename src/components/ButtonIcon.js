import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '@/theme';
import { Fonts } from '@/assets';
import { ms } from 'react-native-size-matters';
import Spinner from 'react-native-loading-spinner-overlay';

export function ButtonIcon({
  pending,
  title,
  icon,
  style,
  textStyle,
  iconStyle,
  onPress,
  iconPostion = 'left',
  ...rest
}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...rest}>
      {pending && <Spinner visible={true} color={COLORS.primary} size="large" />}

      {iconPostion === 'left' && (
        <Image source={icon} resizeMode="contain" style={[styles.iconSize, iconStyle]} />
      )}

      <Text style={[styles.text, textStyle]}>{title}</Text>

      {iconPostion === 'right' && (
        <Image source={icon} resizeMode="contain" style={[styles.iconSize, iconStyle]} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: ms(30),
    borderWidth: 1,
    height: ms(50),
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
