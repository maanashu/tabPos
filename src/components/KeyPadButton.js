import React from 'react';
import { Fonts, cross, deleteBack } from '@/assets';
import { COLORS, SH } from '@/theme';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';

export const KeyPadButton = ({ value, onPress }) => {
  if (value === 'cross' || value === 'deleteBack') {
    // Render an image for the delete and cross buttons
    const imageSource = value === 'cross' ? cross : deleteBack;

    return (
      <TouchableOpacity
        style={[styles.keyPadButton, { backgroundColor: '#E1E3E4' }]}
        onPress={() => onPress(value)}
      >
        <Image
          source={imageSource}
          style={{ resizeMode: 'contain', height: SH(20), width: SH(20) }}
        />
      </TouchableOpacity>
    );
  } else {
    // Render a text button for the numeric keys
    return (
      <TouchableOpacity style={styles.keyPadButton} onPress={() => onPress(value)}>
        <Text style={styles.keyPadText}>{value}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  keyPadButton: {
    height: SH(60),
    width: SH(60),
    borderRadius: SH(30),
    backgroundColor: COLORS.textInputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SH(20),
    marginVertical: ms(10),
  },
  keyPadText: {
    fontSize: SH(28),
    fontFamily: Fonts.Medium,
    color: COLORS.solid_grey,
  },
});
