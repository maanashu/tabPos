import React, { memo, useCallback, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';

import { Spacer } from '@/components';
import { crossButton, Fonts, verified, verifyGreen } from '@/assets';
import { COLORS, SF, SH } from '@/theme';
import { goBack, navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ReturnConfirmation = ({ isVisible, order, onPressHandler }) => {
  useFocusEffect(
    useCallback(() => {
      const timeoutId = setTimeout(() => {
        if (isVisible) {
          navigate(NAVIGATION.dashBoard);
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }, [isVisible])
  );

  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={styles.modalStyle}>
        <Spacer space={ms(30)} />
        <Image
          source={verifyGreen}
          style={{ resizeMode: 'contain', height: ms(30), width: ms(30) }}
        />
        <Spacer space={ms(12)} />

        <Text style={styles.headingTextStyle}>{'Return Confirmed'}</Text>
        {/* <View style={styles.headingRowStyle}>
          <Text style={styles.headingTextStyle}>{'Return Confirmed'}</Text>

          <TouchableOpacity style={styles.crossIconView} onPress={onPressHandler}>
            <Image source={crossButton} style={styles.crossIconStyle} />
          </TouchableOpacity>
        </View> */}

        <Spacer space={SH(30)} />

        <Text style={styles.invoiceTextStyle}>
          {`Invoice No. #${order?.invoice_number} return successfully completed !`}
        </Text>
      </View>
    </ReactNativeModal>
  );
};

export default memo(ReturnConfirmation);

const styles = StyleSheet.create({
  modalStyle: {
    flex: 0.45,
    width: width / 3.8,
    borderRadius: ms(20),
    alignSelf: 'center',
    backgroundColor: COLORS.input_border,
    alignItems: 'center',
    padding: ms(20),
    paddingVertical: ms(10),
  },
  headingTextStyle: {
    fontSize: ms(18),
    textAlign: 'center',
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(20),
    paddingTop: ms(15),
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  invoiceTextStyle: {
    fontSize: ms(10),
    color: COLORS.navy_light_blue,
    fontFamily: Fonts.Medium,
    // paddingHorizontal: SH(20),
  },
  crossIconView: {
    width: SH(28),
    height: SH(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
