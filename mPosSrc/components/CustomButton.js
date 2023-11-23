import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';

import { COLORS, Fonts, SF, SH, SW } from '@/theme';

export function CustomButton({
  style,
  textStyle,
  title,
  image,
  imageStyle,
  subTitle,
  subLabel,
  subTitleStyle,
  pending,
  disable,

  ...rest
}) {
  const { colors } = useTheme();
  return pending ? (
    <TouchableOpacity style={[styles.button, { borderColor: colors.border }, style]} {...rest}>
      <ActivityIndicator animating={true} color={COLORS.white} size={'large'} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[styles.button, { borderColor: colors.border }, style]} {...rest}>
      <Text style={[styles.buttonTextStyle, textStyle]}>{title}</Text>
      {/* <Image source={image} style={(styles.imageStyle, imageStyle)} /> */}
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  imageStyle: PropTypes.object,
  subLabel: PropTypes.object,
  subTitleStyle: PropTypes.object,
};

CustomButton.defaultProps = {
  style: null,
  textStyle: null,
  imageStyle: null,
  subTitle: null,
  subLabel: null,
  subTitleStyle: null,
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SW(16),
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 20,
  },
  buttonTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  imageStyle: {
    width: Platform.OS == 'ios' ? SW(80) : SW(68),
    height: Platform.OS == 'ios' ? SW(55) : SH(50),
  },
});
