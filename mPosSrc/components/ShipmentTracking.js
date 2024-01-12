import React, { useState, memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import dayjs from 'dayjs';
import { ms } from 'react-native-size-matters';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, ShadowStyles } from '@/theme';

const ShipmentTracking = ({ orderData }) => {
  const orderStatus = orderData?.status;
  const [isHideView, setisHideView] = useState(false);

  const currentStatus = (status) => {
    if (status == 1) {
      return strings.orderStatus.orderAccepted;
    } else if (status == 2) {
      return strings.orderStatus.orderPrepare;
    } else if (status == 3) {
      return strings.orderStatus.readyToPickup;
    } else if (status == 4) {
      return strings.orderStatus.pickedUp;
    } else if (status == 5) {
      return strings.orderStatus.delivered;
    }
  };

  const shipmentHeader = (
    <>
      <View style={styles.headerMainView}>
        <View>
          <Text style={styles.orderStatusHeading}>{strings.orderStatus.orderStatus}</Text>
          <Text style={styles.currentStatusText}>{currentStatus(orderStatus)}</Text>
        </View>

        <TouchableOpacity onPress={() => setisHideView(!isHideView)} style={styles.arrowView}>
          <Image source={isHideView ? Images.down : Images.up} style={styles.downArrowStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomLine} />
    </>
  );

  const statusView = (heading, stepCompleted, date, status) => (
    <>
      <View style={styles.statusMainView}>
        <View style={{ alignItems: 'center' }}>
          {heading === 'Verified' ? (
            <Image
              style={styles.verifiedIconStyle}
              source={orderStatus === 5 ? Images.fillRadio : Images.blankRadio}
            />
          ) : (
            <Image
              style={styles.statusIconStyle}
              source={stepCompleted ? Images.radioArrBlue : Images.greyRadioArr}
            />
          )}
        </View>

        <Spacer horizontal space={ms(5)} />

        <View style={styles.eachStatusViewStyle}>
          <View>
            <Text style={styles.statusNameText}>{heading}</Text>
            {date ? (
              <Text style={[styles.currentStatusText, { marginTop: 0 }]}>
                {date ? dayjs(date).format('DD MMM YYYY | HH:mm A') : ''}
              </Text>
            ) : null}
          </View>

          {status === 3 && heading === strings.orderStatus.driverAssigned && (
            <View style={styles.sellerOtpViewStyle}>
              <Text style={styles.sellerOtpTextStyle}>
                {orderData?.order_delivery?.seller_otp ?? '1234'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );

  const latestStatus = () => (
    <>
      <View style={styles.statusMainView}>
        <View style={{ alignItems: 'center' }}>
          <Image source={Images.radioArrBlue} style={styles.statusIconStyle} />
        </View>

        <Spacer horizontal space={ms(5)} />

        <View>
          <Text style={styles.statusNameText}>{currentStatus(orderStatus)}</Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.mainContainer}>
      {shipmentHeader}
      {isHideView ? (
        <View style={styles.statusViewStyle}>
          {statusView(
            strings.orderStatus.verified,
            orderStatus >= 5 && true,
            orderData?.status_desc?.status_5_updated_at,
            orderStatus
          )}
          {statusView(
            strings.orderStatus.delivered,
            orderStatus >= 5 && true,
            orderData?.status_desc?.status_5_updated_at,
            orderStatus
          )}
          {statusView(
            strings.orderStatus.pickup,
            orderStatus >= 4 && true,
            orderData?.status_desc?.status_4_updated_at,
            orderStatus
          )}
          {orderData?.delivery_option !== '3' &&
            statusView(
              strings.orderStatus.driverAssigned,
              orderStatus >= 3 && true,
              orderData?.status_desc?.status_3_updated_at,
              orderStatus
            )}
          {statusView(
            strings.orderStatus.readyToPickup,
            orderStatus >= 2 && true,
            orderData?.status_desc?.status_2_updated_at,
            orderStatus
          )}
          {statusView(
            strings.orderStatus.orderAccepted,
            orderStatus >= 1 && true,
            orderData?.status_desc?.status_1_updated_at,
            orderStatus
          )}
        </View>
      ) : (
        <View style={styles.statusViewStyle}>{latestStatus()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 50,
    borderRadius: ms(7),
    position: 'absolute',
    paddingVertical: ms(15),
    ...ShadowStyles.shadow2,
    backgroundColor: COLORS.white,
    bottom: ms(30),
  },
  statusNameText: {
    color: COLORS.black,
    marginBottom: ms(3),
    fontFamily: Fonts.SemiBold,
  },
  headerMainView: {
    paddingHorizontal: ms(15),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  orderStatusHeading: {
    fontSize: ms(15),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  currentStatusText: {
    fontSize: ms(12),
    marginTop: ms(3),
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
  },
  downArrowStyle: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
  },
  statusMainView: {
    marginBottom: ms(5),
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: ms(10),
  },
  bottomLine: {
    marginTop: ms(10),
    borderBottomWidth: ms(0.2),
    borderBottomColor: COLORS.light_border,
  },
  statusIconStyle: {
    width: ms(15),
    height: ms(25),
    resizeMode: 'stretch',
  },
  verifiedIconStyle: {
    width: ms(14),
    height: ms(10),
    resizeMode: 'contain',
  },
  arrowView: {
    padding: ms(5),
  },
  statusViewStyle: {
    paddingTop: ms(10),
    paddingHorizontal: ms(10),
  },
  addressTextStyle: {
    fontSize: ms(5),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  storeDetailViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerOtpViewStyle: {
    width: ms(50),
    height: ms(18),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  sellerOtpTextStyle: {
    fontSize: SF(13),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  eachStatusViewStyle: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default memo(ShipmentTracking);
