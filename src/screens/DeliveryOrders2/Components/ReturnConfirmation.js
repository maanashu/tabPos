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
import {
  angela,
  cross,
  crossButton,
  dropScan,
  Fonts,
  PaymentDone,
  userImage,
  watchLogo,
} from '@/assets';

const { width } = Dimensions.get('window');

const ReturnConfirmation = ({ isVisible, setIsVisible, onPressRecheck, orderDetail }) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
    >
      <View style={styles.headingRowStyle}>
        <Text style={styles.headingTextStyle}>{strings.returnOrder.heading}</Text>

        <TouchableOpacity
          style={{
            width: SH(34),
            height: SH(34),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setIsVisible(false)}
        >
          <Image source={crossButton} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <Spacer space={SH(30)} />
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
            source={
              orderDetail?.user_details?.profile_photo
                ? { uri: orderDetail?.user_details?.profile_photo }
                : userImage
            }
            style={styles.userImageStyle}
          />

          <View>
            <Text style={styles.customerNameStyle}>
              {`${orderDetail?.user_details?.firstname} ${orderDetail?.user_details?.lastname}` ??
                '-'}
            </Text>
            <Text
              style={styles.addressTextStyle}
            >{`${orderDetail?.user_details?.current_address?.street_address}, ${orderDetail?.user_details?.current_address?.city}, ${orderDetail?.user_details?.current_address?.country}`}</Text>
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
              orderDetail?.driver_details?.profile_photo
                ? { uri: orderDetail?.driver_details?.profile_photo }
                : userImage
            }
            style={styles.userImageStyle}
          />

          <View>
            <Text style={styles.customerNameStyle}>
              {`${orderDetail?.driver_details?.firstname ?? '-'}  ${
                orderDetail?.driver_details?.lastname ?? '-'
              }`}
            </Text>
            <Text style={styles.addressTextStyle}>{`${
              orderDetail?.driver_details?.phone_number ?? '-'
            }`}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.customerViewStyle, { backgroundColor: COLORS.white }]}>
        <Text style={[styles.returnConfirmedTextStyle, { textAlign: 'left' }]}>
          {strings.returnOrder.totalItems}
        </Text>
        <Text style={styles.itemsTextStyle}>{`${orderDetail?.total_items ?? '0'}`}</Text>
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.buttonMainViewStyle}>
        <TouchableOpacity style={styles.checkLaterButtonStyle}>
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
    </ReactNativeModal>
  );
};

export default memo(ReturnConfirmation);

const styles = StyleSheet.create({
  modalStyle: {
    width: Platform.OS === 'android' ? width / 3.2 : width / 3,
    borderRadius: 10,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
  },
  headingTextStyle: {
    fontSize: SF(25),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SH(30),
    paddingTop: ms(20),
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.dark_grey,
  },
  returnConfirmedView: {
    height: ms(30),
    borderRadius: 5,
    width: width / 3.8,
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
    width: width / 3.8,
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
    paddingLeft: ms(2),
  },
  addressTextStyle: {
    fontSize: SF(10),
    paddingLeft: ms(2),
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
    width: ms(100),
    height: ms(35),
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.dark_grey,
  },
  buttonMainViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Platform.OS === 'android' ? width / 3.8 : width / 3.3,
    alignSelf: 'center',
    paddingBottom: ms(20),
    marginHorizontal: 10,
  },
  itemsTextStyle: {
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(6),
    fontSize: SF(14),
    color: COLORS.black,
  },
});
