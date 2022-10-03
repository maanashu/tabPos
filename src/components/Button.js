import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, ShadowStyles, TextStyles } from '@/theme';
import { moderateScale, scale } from 'react-native-size-matters';

export function Button({ style, textStyle, title, ...rest }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: colors.border },
        style,
        ShadowStyles,
      ]}
      {...rest}
    >
      <Text style={[{ color: COLORS.darkGray }, TextStyles.label, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  style: null,
  textStyle: null,
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // padding: moderateScale(16),
    width: moderateScale(330),
    backgroundColor: COLORS.textInputBackground,
  },
});
