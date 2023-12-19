import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SH, ShadowStyles, TextStyles } from '@/theme';
import { moderateScale, ms } from 'react-native-size-matters';
import Spinner from 'react-native-loading-spinner-overlay';
import { Images } from '@/assets/new_icon';
import { Spacer } from './Spacer';

export function ArrowButton({ style, textStyle, title, pending, disable, ...rest }) {
  const { colors } = useTheme();

  return pending ? (
    <TouchableOpacity
      disabled={disable}
      style={[styles.button, { borderColor: colors.border }, style, ShadowStyles]}
      {...rest}
    >
      <Spinner visible={true} color={COLORS.primary} size="large" />
      <Text style={[{ color: COLORS.darkGray }, TextStyles.label, textStyle]}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={0.5}
      underlayColor="#0E86D4"
      style={[styles.button, { borderColor: colors.border }, style, ShadowStyles]}
      {...rest}
    >
      <Text style={[{ color: COLORS.darkGray }, TextStyles.label, textStyle]}>{title}</Text>
      <Spacer horizontal space={ms(3)} />
      <Image source={Images.arrowUpRightIcon} style={styles.arrowIcon} resizeMode="contain" />
    </TouchableOpacity>
  );
}

ArrowButton.propTypes = {
  style: PropTypes.object || PropTypes.array,
  textStyle: PropTypes.object || PropTypes.array,
  title: PropTypes.string.isRequired,
};

ArrowButton.defaultProps = {
  style: null,
  textStyle: null,
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.navy_blue,
    width: '50%',
    height: ms(30),
    paddingHorizontal: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
  },
  arrowIcon: {
    height: ms(13),
    width: ms(13),
    tintColor: COLORS.sky_blue,
  },
});
