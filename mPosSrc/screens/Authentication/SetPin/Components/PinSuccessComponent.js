import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import ReactNativeModal from 'react-native-modal';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const PinSuccessComponent = ({ enableModal, loginHandler }) => (
  <ReactNativeModal isVisible={enableModal} animationIn={'zoomIn'} animationOut={'zoomOut'}>
    <View style={styles.modalViewStyle}>
      <Text style={styles.doneTextStyle}>{strings.setPin.done}</Text>

      <Spacer space={SH(15)} />
      <Image source={Images.verifiedAuth} style={styles.verifiedImageStyle} />

      <Text style={styles.verifiedTextStyle}>{strings.setPin.verified}</Text>
      <Text style={styles.pinSetTextStyle}>{strings.setPin.pinSet}</Text>
      <Spacer space={SH(80)} />

      <TouchableOpacity style={styles.loginButtonStyle} onPress={loginHandler}>
        <Text style={styles.loginTextStyle}>{strings.setPin.login}</Text>
      </TouchableOpacity>
    </View>
  </ReactNativeModal>
);

export default PinSuccessComponent;

const styles = StyleSheet.create({
  modalViewStyle: {
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  doneTextStyle: {
    fontSize: SF(24),
    paddingTop: SW(20),
    textAlign: 'center',
    color: COLORS.lightBlue,
    fontFamily: Fonts.MaisonMonoBold,
  },
  verifiedImageStyle: {
    width: SW(54),
    height: SW(54),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  verifiedTextStyle: {
    fontSize: SF(14),
    paddingTop: SW(20),
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: Fonts.Regular,
  },
  pinSetTextStyle: {
    fontSize: SF(18),
    paddingTop: SW(10),
    textAlign: 'center',
    color: COLORS.dark_gray,
    fontFamily: Fonts.MaisonMonoBold,
  },
  loginButtonStyle: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    paddingVertical: SH(20),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLORS.lightBlue,
  },
  loginTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
});
