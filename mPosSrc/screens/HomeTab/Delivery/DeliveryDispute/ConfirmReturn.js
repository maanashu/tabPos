import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { crossButton, dropScan, Fonts, PaymentDone, userImage, watchLogo } from '@/assets';

const { width } = Dimensions.get('window');

const ConfirmReturn = ({ orderData, isVisible, setIsVisible }) => {
  const userDetails = orderData?.user_details;

  return (
    <View style={styles.modalStyle}>
      <View style={styles.headingRowStyle}>
        <Text style={styles.headingTextStyle}>{strings.returnOrder.heading}</Text>

        <TouchableOpacity style={styles.crossIconViewStyle} onPress={() => setIsVisible(false)}>
          <Image source={crossButton} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <Spacer space={SH(20)} />

      <View style={styles.returnConfirmedView}>
        <Image source={PaymentDone} style={styles.tickIconStyle} />
        <Text style={styles.returnConfirmedTextStyle}>{strings.returnOrder.returnConfirmed}</Text>
      </View>

      <Spacer space={SH(30)} />

      <View style={styles.customerViewStyle}>
        <Text style={[styles.returnConfirmedTextStyle, { textAlign: 'left' }]}>
          {strings.returnOrder.customer}
        </Text>

        <View style={styles.customerDetailViewStyle}>
          <Image
            source={userDetails?.profile_photo ? { uri: userDetails?.profile_photo } : userImage}
            style={styles.userImageStyle}
          />

          <View>
            <Text style={styles.customerNameStyle}>
              {`${userDetails?.firstname} ${userDetails?.lastname}` ?? '-'}
            </Text>
            <Text
              style={styles.addressTextStyle}
            >{`${userDetails?.current_address?.street_address}, ${userDetails?.current_address?.city}, ${userDetails?.current_address?.country}`}</Text>
          </View>
        </View>
      </View>

      <Spacer space={SH(20)} />
      <View style={[styles.customerViewStyle, { backgroundColor: COLORS.white }]}>
        <Text style={[styles.returnConfirmedTextStyle, { textAlign: 'left' }]}>
          {strings.returnOrder.driver}
        </Text>

        <View style={styles.customerDetailViewStyle}>
          <Image
            source={
              orderData?.driver_details?.profile_photo
                ? { uri: orderData?.driver_details?.profile_photo }
                : userImage
            }
            style={styles.userImageStyle}
          />

          <View>
            <Text style={styles.customerNameStyle}>
              {`${orderData?.driver_details?.firstname ?? '-'}  ${
                orderData?.driver_details?.lastname ?? '-'
              }`}
            </Text>
            <Text style={styles.addressTextStyle}>{`${
              orderData?.driver_details?.phone_number ?? '-'
            }`}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.customerViewStyle, { backgroundColor: COLORS.white }]}>
        <Text style={[styles.returnConfirmedTextStyle, { textAlign: 'left' }]}>
          {strings.returnOrder.totalItems}
        </Text>
        <Text style={styles.itemsTextStyle}>{`${orderData?.total_items ?? '0'}`}</Text>
      </View>

      <View style={{ flex: 1 }} />
      <Spacer space={SH(20)} />

      <View style={styles.buttonMainViewStyle}>
        <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.checkLaterButtonStyle}>
          <Image source={watchLogo} style={styles.clockIconStyle} />
          <Text style={styles.buttonTextStyle}>{strings.returnOrder.checkLater}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressRecheck('pressed')}
          style={[styles.checkLaterButtonStyle, { backgroundColor: COLORS.primary }]}
        >
          <Image source={dropScan} style={styles.clockIconStyle} />
          <Text style={styles.buttonTextStyle}>{strings.returnOrder.recheck}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ConfirmReturn);

const styles = StyleSheet.create({
  modalStyle: {
    width: width - 40,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  headingTextStyle: {
    fontSize: SF(16),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(20),
    paddingTop: ms(20),
    justifyContent: 'space-between',
  },
  crossIconViewStyle: {
    width: SH(24),
    height: SH(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  returnConfirmedView: {
    width: width - 80,
    height: ms(40),
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(10),
    backgroundColor: COLORS.blue_shade,
  },
  returnConfirmedTextStyle: {
    fontSize: SF(11),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(5),
  },
  tickIconStyle: {
    width: SH(18),
    height: SH(18),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  customerViewStyle: {
    borderRadius: 5,
    width: width - 80,
    alignSelf: 'center',
    paddingVertical: ms(8),
    paddingHorizontal: ms(6),
    backgroundColor: COLORS.textInputBackground,
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    resizeMode: 'contain',
  },
  customerNameStyle: {
    fontSize: SF(13),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(8),
  },
  addressTextStyle: {
    fontSize: SF(10),
    paddingLeft: ms(8),
    paddingTop: ms(1),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  customerDetailViewStyle: {
    flexDirection: 'row',
    paddingTop: ms(5),
  },
  clockIconStyle: {
    width: SH(18),
    height: SH(18),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  buttonTextStyle: {
    fontSize: SF(16),
    paddingLeft: ms(5),
    color: COLORS.white,
    fontFamily: Fonts.Bold,
  },
  checkLaterButtonStyle: {
    borderRadius: 5,
    padding: ms(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.dark_grey,
  },
  buttonMainViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 80,
    alignSelf: 'center',
    paddingBottom: ms(30),
    marginHorizontal: 10,
  },
  itemsTextStyle: {
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(6),
    fontSize: SF(14),
    color: COLORS.black,
  },
});
