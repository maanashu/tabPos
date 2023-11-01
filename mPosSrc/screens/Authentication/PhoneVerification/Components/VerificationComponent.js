import React from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

export function VerificationComponent({ setShowModal }) {
  return (
    <View style={styles.modalViewStyle}>
      <TouchableOpacity onPress={() => setShowModal(false)}>
        <Image source={Images.cross} style={styles.crossImageStyle} />
      </TouchableOpacity>

      <Image source={Images.successTick} style={styles.successTickImageStyle} />

      <Spacer space={SH(50)} />
      <Text style={styles.verifiedTextStyle}>{strings.phoneNumber.successfullyVerified}</Text>

      <Text style={styles.loginbackTextStyle}>{strings.phoneNumber.loginBack}</Text>

      <Spacer space={SH(30)} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalViewStyle: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  crossImageStyle: {
    width: SW(18),
    height: SW(18),
    marginRight: SW(10),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginVertical: SH(20),
  },
  successTickImageStyle: {
    width: SW(100),
    height: SW(100),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  verifiedTextStyle: {
    fontSize: SF(24),
    textAlign: 'center',
    color: COLORS.darkBlue,
    fontFamily: Fonts.MaisonMonoBold,
  },
  loginbackTextStyle: {
    paddingTop: 10,
    fontSize: SF(14),
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: Fonts.Regular,
  },
});
