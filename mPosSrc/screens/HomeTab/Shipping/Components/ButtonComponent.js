import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { ms } from 'react-native-size-matters';

import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF } from '@/theme';

const ButtonComponent = ({ status, onPressHandler }) => {
  return (
    <>
      {status === 0 ? (
        <View style={styles.buttonViewStyle}>
          <TouchableOpacity style={styles.declineButtonStyle}>
            <Text style={styles.declineButtonText}>{strings.delivery.decline}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressHandler} style={styles.acceptButtonStyle}>
            <Text style={styles.acceptButtonText}>{strings.delivery.accept}</Text>
          </TouchableOpacity>
        </View>
      ) : status === 3 ? (
        <View style={styles.buttonViewStyle}>
          <TouchableOpacity onPress={onPressHandler} style={styles.preparedButtonStyle}>
            <Text style={styles.acceptButtonText}>{strings.buttonStatus.printlabel}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default memo(ButtonComponent);

const styles = StyleSheet.create({
  buttonViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
  },
  acceptButtonStyle: {
    backgroundColor: COLORS.primary,
    flex: 0.45,
    borderRadius: 5,
    paddingHorizontal: ms(20),
    paddingVertical: ms(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.white,
  },
  declineButtonStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.light_border,
    flex: 0.45,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: ms(20),
    paddingVertical: ms(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButtonText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.grayShade,
  },
  preparedButtonStyle: {
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: ms(20),
    paddingVertical: ms(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
