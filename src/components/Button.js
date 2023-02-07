import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { COLORS, ShadowStyles, TextStyles } from '@/theme';
import { moderateScale, scale } from 'react-native-size-matters';
import Spinner from 'react-native-loading-spinner-overlay';

export function Button({ style, textStyle, title, pending, disable, ...rest }) {
  const { colors } = useTheme();

  return pending ? (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: colors.border },
        style,
        ShadowStyles,
      ]}
      {...rest}
    >
      <Spinner visible={true} color={COLORS.primary} size="large" />
      <Text style={[{ color: COLORS.darkGray }, TextStyles.label, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor="#0E86D4"
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
    </TouchableHighlight>
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
