import { Fonts } from '@/assets';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { SH, SW, COLORS, SF } from '@/theme';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  inputStyle: {
    marginRight: SW(40),
    color: COLORS.black,
    fontSize: SF(14),
    fontFamily: Fonts.Italic,
    paddingHorizontal: SW(10),
    marginHorizontal: SW(12),
    height: SH(50),
    flex: 1,
  },
  wrapper: {
    marginHorizontal: SW(12),
    backgroundColor: COLORS.inputBorder,
    borderRadius: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    height: SH(50),
  },
  imageStyle: {
    left: moderateScale(12),
    height: 16,
    width: 20,
  },
});

export function TextField({ label, imageStyle, style, image, secureTextEntry, ...rest }) {
  const [showText, setVisibility] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <Image source={image} style={[styles.imageStyle, imageStyle]} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={showText}
        style={[styles.inputStyle, style]}
        {...rest}
        placeholder={label}
        placeholderTextColor={'#A7A7A7'}
      />
    </View>
  );
}
// defines the types for prop
TextField.propTypes = {
  styles: PropTypes.style,
  imageStyle: PropTypes.style,
};
// defines the default value for the prop
TextField.defaultProps = {
  imageStyle: {},
  styles: {},
};
